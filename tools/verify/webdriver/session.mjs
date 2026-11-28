// @ts-check
import { WebDriverError } from './protocol.mjs';

/** @typedef {Awaited<ReturnType<typeof import('./driver.mjs').startDriver>>} Driver Owned native transport. */
/** @typedef {{ timeoutMs?: number, signal?: AbortSignal }} CommandOptions Per-command cancellation and optional override. */
/** @typedef {{ script?: number, pageLoad?: number, implicit?: number }} Timeouts Finite verification policies, in milliseconds. */

/**
 * A validated browser session retains its own timeout policy and negotiated capabilities.
 *
 * Commands use the driver lifetime. Scripts and navigation retain their remote
 * budgets plus transport grace; metadata and vendor commands use the driver's
 * default. This harness requires finite remote timeouts so failed verification
 * can reach cleanup. HTTP cancellation does not stop browser-side work by itself.
 */
export class Session {
	/** @type {Driver} Driver process and transport remain owned by the caller. */
	#driver;
	/** @type {AbortSignal | undefined} Cancel ordinary work without preventing remote teardown. */
	#signal;
	/** Extra time allows the remote timeout response to arrive before HTTP cancellation. */
	#grace;
	/** W3C defaults apply until negotiated capabilities or a successful update replace them. */
	#timeouts = { script: 30_000, pageLoad: 300_000, implicit: 0 };
	/** @type {Promise<unknown> | undefined} Repeated teardown observes the same DELETE result. */
	#quitting;

	/**
	 * @param {Driver} driver Owned native transport.
	 * @param {string} id Validated remote session identity.
	 * @param {Record<string, any>} capabilities Negotiated values returned by New Session.
	 * @param {number} graceMs Transport allowance after a remote timeout.
	 * @param {AbortSignal} [signal] Run cancellation; DELETE cleanup uses only the driver lifetime.
	 */
	constructor(driver, id, capabilities, graceMs, signal) {
		this.#driver = driver;
		this.#signal = signal;
		this.#grace = graceMs;
		this.id = id;
		this.capabilities = Object.freeze(capabilities);
		if (capabilities.timeouts) this.#timeouts = { ...this.#timeouts, ...finiteTimeouts(capabilities.timeouts, graceMs) };
	}

	/**
	 * Reject malformed identities before any session URL can be constructed.
	 * @param {Driver} driver Transport tied to a live native driver.
	 * @param {unknown} capabilities Caller-selected W3C capability request.
	 * @param {{ timeoutMs?: number, signal?: AbortSignal, transportGraceMs?: number }} [options] New-session budget and subsequent transport grace.
	 */
	static async create(driver, capabilities, { timeoutMs = 60_000, signal, transportGraceMs = 5_000 } = {}) {
		if (!Number.isInteger(transportGraceMs) || transportGraceMs < 0 || transportGraceMs > 60_000) {
			throw new RangeError('WebDriver transport grace must be between 0 and 60000 milliseconds.');
		}
		const value = await driver.request('POST', '/session', { capabilities }, { timeoutMs, signal });
		if (!value || typeof value !== 'object' || Array.isArray(value)
			|| typeof value.sessionId !== 'string' || !value.sessionId.trim()) {
			throw new Error('Invalid WebDriver New Session response: expected a nonempty sessionId.');
		}
		try {
			if (!value.capabilities || typeof value.capabilities !== 'object' || Array.isArray(value.capabilities)) {
				throw new Error('Invalid WebDriver New Session response: expected a capabilities object.');
			}
			return new Session(driver, value.sessionId, value.capabilities, transportGraceMs, signal);
		} catch (cause) {
			// A valid ID already identifies an acquired remote session, even when
			// its capabilities are unusable. Release it before rejecting creation.
			try { await deleteSession(driver, value.sessionId); }
			catch (cleanupError) { throw new AggregateError([cause, cleanupError], 'WebDriver session validation and cleanup both failed.'); }
			throw cause;
		}
	}

	/**
	 * Scope a command to this session and retain the matching remote timeout.
	 * @param {string} method HTTP method.
	 * @param {string} path Session-relative protocol path.
	 * @param {unknown} [body] Endpoint-specific payload.
	 * @param {CommandOptions} [options] Explicit exchange policy.
	 */
	cmd(method, path, body, options = {}) {
		if (this.#quitting) return Promise.reject(new Error('WebDriver session is closing.'));
		const signal = this.#signal && options.signal ? AbortSignal.any([this.#signal, options.signal]) : this.#signal ?? options.signal;
		let timeoutMs = options.timeoutMs;
		if (timeoutMs === undefined && method === 'POST') {
			if (path === '/execute/sync' || path === '/execute/async') timeoutMs = Math.max(1, this.#timeouts.script + this.#grace);
			if (['/url', '/back', '/forward', '/refresh'].includes(path)) timeoutMs = Math.max(1, this.#timeouts.pageLoad + this.#grace);
		}
		return this.#driver.request(method, `/session/${encodeURIComponent(this.id)}${path}`, body, {
			...options, signal, ...(timeoutMs === undefined ? {} : { timeoutMs }),
		});
	}

	/** @param {string} url Destination for the selected context. @param {CommandOptions} [options] Optional caller cancellation. */
	navigate(url, options) { return this.cmd('POST', '/url', { url }, options); }
	/** @param {CommandOptions} [options] Read the actual current URL, not cached navigation intent. */
	url(options) { return this.cmd('GET', '/url', undefined, options); }
	/** @param {CommandOptions} [options] Read currently open context identities. */
	handles(options) { return this.cmd('GET', '/window/handles', undefined, options); }
	/** @param {CommandOptions} [options] Read the selected context before focus changes. */
	handle(options) { return this.cmd('GET', '/window', undefined, options); }
	/** @param {string} handle Existing context identity. @param {CommandOptions} [options] Optional exchange policy. */
	switchTo(handle, options) { return this.cmd('POST', '/window', { handle }, options); }
	/** @param {string} [type] Create a tab unless a window is requested. @param {CommandOptions} [options] Optional exchange policy. */
	async newWindow(type = 'tab', options) {
		const value = await this.cmd('POST', '/window/new', { type }, options);
		if (typeof value?.handle !== 'string' || !value.handle) throw new Error('WebDriver returned no handle for the new context.');
		return value.handle;
	}
	/** @param {CommandOptions} [options] Close the selected context while retaining the session. */
	close(options) { return this.cmd('DELETE', '/window', undefined, options); }
	/** @param {string} script Synchronous script. @param {unknown[]} [args] Positional arguments. @param {CommandOptions} [options] Optional exchange policy. */
	exec(script, args = [], options) { return this.cmd('POST', '/execute/sync', { script, args }, options); }
	/** @param {string} script Callback-completing script. @param {unknown[]} [args] Positional arguments. @param {CommandOptions} [options] Optional exchange policy. */
	execAsync(script, args = [], options) { return this.cmd('POST', '/execute/async', { script, args }, options); }

	/**
	 * Commit local policy only after the driver accepts the update.
	 * @param {Timeouts} timeouts Finite remote budgets; omitted fields keep their current values.
	 * @param {CommandOptions} [options] Optional exchange policy.
	 */
	async setTimeouts(timeouts, options) {
		const next = finiteTimeouts(timeouts, this.#grace);
		const value = await this.cmd('POST', '/timeouts', next, options);
		this.#timeouts = { ...this.#timeouts, ...next };
		return value;
	}

	/**
	 * Delete this session once, independently of canceled ordinary work.
	 * An already absent session is harmless; other failures remain visible.
	 * @param {CommandOptions} [options] Cleanup defaults to a five-second exchange budget.
	 */
	quit(options = {}) {
		this.#quitting ??= deleteSession(this.#driver, this.id, options);
		return this.#quitting;
	}
}

/**
 * Release a known remote identity even when session validation never completed.
 * @param {Driver} driver Native transport retained by the caller.
 * @param {string} id Known session identity.
 * @param {CommandOptions} [options] Optional cleanup exchange policy.
 */
function deleteSession(driver, id, options = {}) {
	return driver.request('DELETE', `/session/${encodeURIComponent(id)}`, undefined, {
		...options, timeoutMs: options.timeoutMs ?? 5_000,
	}).catch((error) => {
		if (!(error instanceof WebDriverError && error.webdriver.error === 'invalid session id')) throw error;
	});
}

/**
 * Keep the harness finite without changing the native command's accepted budget.
 * @param {Timeouts} values Timeout fields to apply.
 * @param {number} graceMs Reserved transport allowance.
 * @returns {Timeouts} Validated copy, so later caller mutation cannot change policy.
 */
function finiteTimeouts(values, graceMs) {
	if (!values || typeof values !== 'object' || Array.isArray(values)) throw new TypeError('WebDriver timeouts must be an object.');
	/** @type {Timeouts} Only timeout fields used by the protocol are retained. */
	const next = {};
	for (const key of /** @type {const} */ (['script', 'pageLoad', 'implicit'])) {
		const value = values[key];
		if (value === undefined) continue;
		if (!Number.isInteger(value) || value < 0 || value > 2_147_483_647 - graceMs) {
			throw new RangeError(`WebDriver verification requires a finite ${key} timeout with room for transport grace.`);
		}
		next[key] = value;
	}
	return next;
}
