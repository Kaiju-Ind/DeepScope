import type { DiagnosticError, DiagnosticValue } from "../contracts.ts";
import { redactDiagnosticValue } from "@deepscope/detection/privacy/redaction";
import * as dictionary from "@deepscope/detection/observations/dictionary";
import type { LogRecord } from "@logtape/logtape";

const MAX_OBJECT_KEYS = 16;
const MAX_ARRAY_ITEMS = 16;
const MAX_DEPTH = 4;
export const MAX_STRING_CHARS = 400;
const MAX_STACK_CHARS = 4_000;

/** Convert an exception or error-like value into bounded support data. */
export function toDiagnosticError(error: unknown): DiagnosticError {
	if (error instanceof Error) {
		return {
			name: error.name || 'Error',
			message: redactDiagnosticValue(error.message || 'Unknown error', MAX_STRING_CHARS),
			...(error.stack ? { stack: redactDiagnosticValue(error.stack, MAX_STACK_CHARS) } : {}),
			...(error.cause === undefined ? {} : { cause: sanitizeDiagnosticValue(error.cause, 1, 'cause') }),
		};
	}

	if (typeof error === 'object' && error !== null) {
		const value = error as Record<string, unknown>;
		return {
			name: typeof value.name === 'string' ? redactDiagnosticValue(value.name, 120) : 'Error',
			message: typeof value.message === 'string'
				? redactDiagnosticValue(value.message, MAX_STRING_CHARS)
				: redactDiagnosticValue(String(error), MAX_STRING_CHARS),
			...(typeof value.stack === 'string' ? { stack: redactDiagnosticValue(value.stack, MAX_STACK_CHARS) } : {}),
		};
	}

	return { name: 'Error', message: redactDiagnosticValue(String(error), MAX_STRING_CHARS) };
}

/** Bound the top-level property count and sanitize each value into a prototype-free diagnostic record. */
export function sanitizeDiagnosticProperties(properties: Readonly<Record<string, unknown>>): Record<string, DiagnosticValue> {
	const result = dictionary.create<DiagnosticValue>();
	for (const [key, value] of Object.entries(properties).slice(0, MAX_OBJECT_KEYS)) {
		result[key] = sanitizeDiagnosticValue(value, 0, key);
	}
	return result;
}

/** Redact and bound diagnostic values by depth, item count and text length before storage or transport. */
function sanitizeDiagnosticValue(value: unknown, depth: number, key?: string): DiagnosticValue {
	if (value === null || value === undefined) return value === null ? null : '[undefined]';
	if (typeof value === 'boolean' || typeof value === 'number') return Number.isFinite(value) ? value : String(value);
	if (typeof value === 'string') {
		return redactDiagnosticValue(value, key === 'stack' ? MAX_STACK_CHARS : MAX_STRING_CHARS);
	}
	if (typeof value === 'bigint' || typeof value === 'symbol' || typeof value === 'function') {
		return redactDiagnosticValue(String(value), MAX_STRING_CHARS);
	}
	if (value instanceof Error) return sanitizeDiagnosticValue(toDiagnosticError(value), depth + 1, key);
	if (depth >= MAX_DEPTH) return '[truncated]';
	if (Array.isArray(value)) {
		return value.slice(0, MAX_ARRAY_ITEMS).map((item) => sanitizeDiagnosticValue(item, depth + 1));
	}
	if (typeof value === 'object') {
		const result = dictionary.create<DiagnosticValue>();
		for (const [childKey, childValue] of Object.entries(value as Record<string, unknown>).slice(0, MAX_OBJECT_KEYS)) {
			result[childKey] = sanitizeDiagnosticValue(childValue, depth + 1, childKey);
		}
		return result;
	}
	return redactDiagnosticValue(String(value), MAX_STRING_CHARS);
}

/** Identify levels that bypass successful-record throttling and receive reserved retention space. */
export function isImportantDiagnosticLevel(level: LogRecord['level']): boolean {
	return level === 'warning' || level === 'error' || level === 'fatal';
}

/** Join the logger's message parts without inserting separators; structured parts use the diagnostic serializer. */
export function formatLogMessage(record: LogRecord): string {
	return record.message.map((part) => typeof part === 'string' ? part : formatMessagePart(part)).join('');
}

/** Convert structured message values into bounded diagnostic text, retaining a fallback for unserializable values. */
function formatMessagePart(value: unknown): string {
	if (value instanceof Error) return `${value.name}: ${value.message}`;
	if (typeof value === 'string') return value;
	try {
		const json = JSON.stringify(sanitizeDiagnosticValue(value, 0));
		return json ?? String(value);
	} catch {
		return String(value);
	}
}
