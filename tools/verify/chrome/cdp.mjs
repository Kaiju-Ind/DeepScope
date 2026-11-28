/** Maximum time to open a debugging connection or receive one command response. */
const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * @typedef {Object} Client
 * @property {(method: string, params?: object) => Promise<unknown>} send Send one command and await its protocol result.
 * @property {(method: string, listener: (params: unknown) => void) => void} on Subscribe until this connection closes.
 * @property {() => void} close Cancel remaining commands and release the socket.
 */

/**
 * Connect to one Chrome target and own its command subscriptions.
 *
 * A closed socket rejects every outstanding command. Each command also has a
 * deadline, so a browser that remains connected but stops replying cannot leave
 * artifact validation waiting forever. Responses contain `message.result`.
 *
 * @param {string} url Target WebSocket URL returned by Chrome's debugging endpoint.
 * @param {{ timeoutMs?: number }} [options] Deadline shared by connection startup and individual commands.
 * @returns {Promise<Client>} The caller owns connection disposal.
 */
export function connect(url, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
	return new Promise((resolveClient, rejectConnection) => {
		const socket = new WebSocket(url);
		/** Commands retain their resolver and deadline until response or disposal. */
		const pending = new Map();
		/** Event listeners belong to this connection and are released on closure. */
		const listeners = new Map();
		let sequence = 0;
		let terminalError;
		const opening = setTimeout(() => close(new Error(`Chrome target did not connect within ${timeoutMs}ms: ${url}`)), timeoutMs);

		/** Settle the connection once, release command timers and stop browser delivery. */
		function close(error) {
			if (terminalError) return;
			terminalError = error;
			clearTimeout(opening);
			rejectConnection(error);
			for (const request of pending.values()) {
				clearTimeout(request.timeout);
				request.reject(error);
			}
			pending.clear();
			listeners.clear();
			if (socket.readyState !== WebSocket.CLOSED) socket.close();
		}

		socket.addEventListener('open', () => {
			if (terminalError) return;
			clearTimeout(opening);
			resolveClient({
				/** Correlate one command and release its pending entry on any terminal outcome. */
				send(method, params = {}) {
					if (terminalError) return Promise.reject(terminalError);
					const id = ++sequence;
					return new Promise((resolve, reject) => {
						const timeout = setTimeout(() => {
							pending.delete(id);
							reject(new Error(`Chrome DevTools command ${method} did not respond within ${timeoutMs}ms.`));
						}, timeoutMs);
						pending.set(id, { resolve, reject, timeout });
						try {
							socket.send(JSON.stringify({ id, method, params }));
						} catch (error) {
							pending.delete(id);
							clearTimeout(timeout);
							reject(error);
						}
					});
				},
				/** Subscribe to a protocol event until the caller closes this connection. */
				on(method, listener) {
					if (terminalError) throw terminalError;
					const current = listeners.get(method) ?? [];
					current.push(listener);
					listeners.set(method, current);
				},
				/** Cancel any remaining commands and release this target's connection. */
				close() { close(new Error('Chrome target connection closed by the validator.')); },
			});
		});
		socket.addEventListener('error', () => close(new Error(`Chrome target connection failed: ${url}`)));
		socket.addEventListener('close', () => close(new Error(`Chrome target connection closed: ${url}`)));
		socket.addEventListener('message', (event) => {
			if (terminalError) return;
			try {
				const message = JSON.parse(String(event.data));
				if (typeof message.id === 'number') {
					const request = pending.get(message.id);
					if (!request) return;
					pending.delete(message.id);
					clearTimeout(request.timeout);
					if (message.error) request.reject(new Error(message.error.message ?? 'Chrome DevTools request failed.'));
					else request.resolve(message.result);
					return;
				}
				for (const listener of listeners.get(message.method) ?? []) listener(message.params ?? {});
			} catch (error) {
				close(error instanceof Error ? error : new Error(String(error)));
			}
		});
	});
}
