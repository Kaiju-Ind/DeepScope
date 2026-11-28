// @ts-check

/**
 * A complete exchange has a finite deadline and may share a caller or driver signal.
 * @typedef {{ timeoutMs: number, signal?: AbortSignal }} RequestOptions
 */

/** Preserve the remote error code and message for browser-specific owner actions. */
export class WebDriverError extends Error {
	/**
	 * @param {string} method HTTP method sent to the driver.
	 * @param {string} path Protocol path without the loopback origin.
	 * @param {number} status Actual HTTP failure status.
	 * @param {Record<string, unknown>} value Remote protocol details.
	 */
	constructor(method, path, status, value) {
		super(`${method} ${path}: ${value.error ?? status} ${value.message ?? ''}`.trim());
		this.name = 'WebDriverError';
		this.status = status;
		this.webdriver = value;
	}
}

/**
 * Read one WebDriver envelope within the same deadline as its request headers.
 *
 * HTTP failure identifies a protocol error. A successful script may itself
 * return an object with an `error` field, and a void command returns `null`.
 * Aborting this exchange does not prove that the browser stopped its command.
 *
 * @param {string} base The owned driver's loopback origin.
 * @param {string} method HTTP method.
 * @param {string} path Protocol path, including the encoded session ID if needed.
 * @param {unknown} body Optional command payload.
 * @param {RequestOptions} options Lifetime and per-exchange deadline.
 * @returns {Promise<any>} Endpoint-specific value after envelope validation.
 */
export async function request(base, method, path, body, { signal: lifetime, timeoutMs }) {
	if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 2_147_483_647) {
		throw new RangeError('WebDriver request timeout must be between 1 and 2147483647 milliseconds.');
	}
	const deadline = new AbortController();
	const timer = setTimeout(() => deadline.abort(new DOMException(
		`${method} ${path} did not finish within ${timeoutMs}ms.`, 'TimeoutError',
	)), timeoutMs);
	const signal = lifetime ? AbortSignal.any([lifetime, deadline.signal]) : deadline.signal;
	try {
		const response = await fetch(`${base}${path}`, {
			method, signal, headers: { 'content-type': 'application/json' },
			...(body === undefined ? {} : { body: JSON.stringify(body) }),
		});
		/** Keep malformed bodies distinct from legitimate void results. */
		let envelope;
		try {
			envelope = await response.json();
		} catch (cause) {
			signal.throwIfAborted();
			throw new Error(`Invalid WebDriver JSON for ${method} ${path} (HTTP ${response.status}).`, { cause });
		}
		if (!envelope || typeof envelope !== 'object' || Array.isArray(envelope) || !Object.hasOwn(envelope, 'value')) {
			throw new Error(`Invalid WebDriver envelope for ${method} ${path} (HTTP ${response.status}): missing value.`);
		}
		if (!response.ok) {
			const value = envelope.value;
			throw new WebDriverError(method, path, response.status,
				value && typeof value === 'object' && !Array.isArray(value) ? value : {});
		}
		return envelope.value;
	} finally {
		clearTimeout(timer);
	}
}
