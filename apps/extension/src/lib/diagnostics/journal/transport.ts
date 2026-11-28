import type { DiagnosticTransportMessage } from "../contracts.ts";

/** Minimal sender used to move storage-less diagnostics toward the background. */
type DiagnosticTransportSender = {
	send(message: DiagnosticTransportMessage): Promise<unknown> | unknown;
};

/** Return a runtime or parent-worker sender without importing browser-only APIs at build time. */
export function getDiagnosticTransportSender(): DiagnosticTransportSender | null {
	const runtime = globalThis as typeof globalThis & {
		browser?: { runtime?: { sendMessage(message: DiagnosticTransportMessage): Promise<unknown> | unknown } };
		chrome?: { runtime?: { sendMessage(message: DiagnosticTransportMessage): Promise<unknown> | unknown } };
		postMessage?: (message: DiagnosticTransportMessage) => void;
		document?: Document;
	};
	const extensionRuntime = runtime.browser?.runtime ?? runtime.chrome?.runtime;
	if (extensionRuntime) {
		return { /** Forward a diagnostic envelope through extension messaging; the receiving journal owns persistence. */ send: (message) => extensionRuntime.sendMessage(message) };
	}

	// Dedicated matcher workers do not own extension storage or runtime APIs. Their
	// parent offscreen document forwards the same validated transport message.
	if (runtime.document === undefined && typeof runtime.postMessage === 'function') {
		return { /** Forward a diagnostic envelope to the worker host when direct extension storage is unavailable. */ send: (message) => runtime.postMessage?.(message) };
	}

	return null;
}

/** Forward one already-sanitized diagnostic to the background persistence owner. */
export function transportDiagnosticMessage(message: DiagnosticTransportMessage): void {
	const sender = getDiagnosticTransportSender();
	if (!sender) return;
	try {
		void Promise.resolve(sender.send(message)).catch(() => undefined);
	} catch {
		// Diagnostics must never crash the extension surface they are trying to describe.
	}
}
