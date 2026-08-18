import { readFileSync } from 'node:fs';

import { parseSync, type Program } from 'oxc-parser';

/** Minimal ESTree/TS-ESTree node shape used by architecture tests. */
export interface OxcNodeType {
	readonly type: string;
	readonly start?: number;
	readonly end?: number;
	readonly [key: string]: unknown;
}

/** Parsed source plus text needed for precise architecture-test diagnostics. */
export interface OxcSourceType {
	readonly path: string;
	readonly text: string;
	readonly program: Program;
}

/** Parse one JavaScript or TypeScript source file with Oxc's TS-ESTree output. */
export function parseSource(path: string): OxcSourceType {
	const text = readFileSync(path, 'utf8');
	const result = parseSync(path, text, { astType: 'ts' });
	if (result.errors.length > 0) {
		throw new Error(`${path}: Oxc parse failed:\n${result.errors.map((error) => String(error)).join('\n')}`);
	}

	return { path, text, program: result.program };
}

/** Return whether an unknown AST value is an Oxc node. */
export function isNode(value: unknown): value is OxcNodeType {
	return Boolean(value && typeof value === 'object' && typeof (value as { readonly type?: unknown }).type === 'string');
}

/** Visit every descendant node while preserving the structural ancestor stack. */
export function walk(
	node: Program,
	visit: (node: OxcNodeType, ancestors: readonly OxcNodeType[]) => void,
	ancestors: readonly OxcNodeType[] = [],
): void {
	visit(node, ancestors);
	const nextAncestors = [...ancestors, node];
	for (const [key, value] of Object.entries(node)) {
		if (key === 'loc' || key === 'range' || key === 'comments' || key === 'tokens') continue;
		if (isNode(value)) {
			walk(value, visit, nextAncestors);
			continue;
		}
		if (!Array.isArray(value)) continue;
		for (const item of value) {
			if (isNode(item)) walk(item, visit, nextAncestors);
		}
	}
}

/** Convert one Oxc character offset into a one-based source line. */
export function line(source: OxcSourceType, node: OxcNodeType): number {
	const offset = typeof node.start === 'number' ? node.start : 0;
	let lineNumber = 1;
	for (let index = 0; index < offset; index += 1) {
		if (source.text.charCodeAt(index) === 10) lineNumber += 1;
	}
	return lineNumber;
}

/** Return one identifier name when a TS-ESTree node carries a plain identifier. */
export function identifierName(node: unknown): string | undefined {
	if (!isNode(node) || node.type !== 'Identifier') return undefined;
	const name = node.name;
	return typeof name === 'string' ? name : undefined;
}

/** Return the root identifier from a JSX component name such as `Menu.Label`. */
export function jsxRootName(node: unknown): string | undefined {
	if (!isNode(node)) return undefined;
	if (node.type === 'JSXIdentifier') {
		return typeof node.name === 'string' ? node.name : undefined;
	}
	if (node.type === 'JSXMemberExpression') return jsxRootName(node.object);
	if (node.type === 'JSXNamespacedName') return jsxRootName(node.namespace);
	return undefined;
}
