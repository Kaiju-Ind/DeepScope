import { browser } from "wxt/browser";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";
import type { CollectorLog, JsGlobalSignalValue } from "./types.ts";

/**
 * Reads page-owned JavaScript globals with a short injected script.
 *
 * A content script runs in its own isolated JavaScript environment. That means
 * it can see the DOM but not values like `window.__NEXT_DATA__` exactly as the
 * page's own scripts see them. The background uses `browser.scripting` to run a
 * tiny function in the page and returns only bounded primitive summaries.
 */
export async function collectInjectedJsGlobals(
	tabId: number,
	propertyPaths: string[],
	log?: CollectorLog,
	incognito = false,
	signal?: AbortSignal,
): Promise<Record<string, JsGlobalSignalValue>> {
	signal?.throwIfAborted();
	if (!propertyPaths.length) {
		return {};
	}

	try {
		const results = await browser.scripting.executeScript({
			target: { tabId, frameIds: [0] },
			world: 'MAIN' as const,
			func: collectInjectedJsGlobalsFromPageContext,
			args: [propertyPaths, SOURCE_LIMITS.jsGlobalValueChars],
		});

		signal?.throwIfAborted();
		const firstResult = results[0]?.result;
		return isJsGlobalSignalRecord(firstResult) ? firstResult : {};
	} catch (error) {
		log?.('collect-js-globals-failed', {
			tabId,
			...(incognito
				? { errorType: diagnosticErrorType(error) }
				: { message: error instanceof Error ? error.message : 'Unknown JavaScript global collection failure' }),
		});
		return {};
	}
}

/** Reject injected results that contain arrays or values outside the serializable global-signal primitives. */
function isJsGlobalSignalRecord(value: unknown): value is Record<string, JsGlobalSignalValue> {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	return Object.values(value).every((item) =>
		typeof item === 'string' || typeof item === 'boolean' || typeof item === 'number',
	);
}

/** Collect bounded registry-selected globals in the page's MAIN world; this serialized function must remain import-free. */
function collectInjectedJsGlobalsFromPageContext(
	propertyPaths: string[],
	maxValueChars: number,
): Record<string, JsGlobalSignalValue> {
	// This function is serialized into the page's MAIN world and cannot import
	// modules. Global paths come from the registry, but the record still has no
	// prototype so a path such as `constructor` stays ordinary data.
	const values = Object.create(null) as Record<string, JsGlobalSignalValue>;
	const root = globalThis as Record<string, unknown>;

	/** Get one injected page-global value without invoking unrelated global properties. */
	function getGlobalPath(propertyPath: string): unknown {
		if (Object.hasOwn(root, propertyPath)) {
			return root[propertyPath];
		}

		let current: unknown = root;
		for (const segment of propertyPath.split('.')) {
			if (current === undefined || current === null) {
				return undefined;
			}

			current = (current as Record<string, unknown>)[segment];
		}

		return current;
	}

	/** Convert an injected page-global value into the bounded signal representation. */
	function summarizeValue(value: unknown): JsGlobalSignalValue {
		const valueType = typeof value;
		if (valueType === 'string') {
			return (value as string).slice(0, maxValueChars);
		}
		if (valueType === 'number' || valueType === 'boolean') {
			return value as number | boolean;
		}
		if (valueType === 'function') {
			return 'function';
		}

		try {
			const constructorName = (value as { constructor?: { name?: string } }).constructor?.name;
			if (constructorName) {
				return constructorName.slice(0, maxValueChars);
			}
		} catch {
			// Fall through to String(value).
		}

		return String(value).slice(0, maxValueChars);
	}

	for (const propertyPath of propertyPaths) {
		try {
			const value = getGlobalPath(propertyPath);
			if (value === undefined || value === null) {
				continue;
			}

			values[propertyPath] = summarizeValue(value);
		} catch {
			// Some pages define getters with side effects or throwing accessors. Treat
			// those globals as unavailable rather than letting detection mutate the page.
		}
	}

	return values;
}
