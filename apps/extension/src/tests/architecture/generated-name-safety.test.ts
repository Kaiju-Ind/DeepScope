import { readdirSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
	identifierName,
	isNode,
	line,
	parseSource,
	walk,
	type OxcNodeType,
	type OxcSourceType,
} from '@/tests/support/oxc';

const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const GENERATED_REGISTRY_ROOT = 'registry/technology';
const GENERATED_RUNTIME_GLOBAL_NAMES = new Set([
	'AbortController',
	'AbortSignal',
	'AggregateError',
	'Array',
	'ArrayBuffer',
	'BigInt',
	'Blob',
	'Boolean',
	'Date',
	'Error',
	'Event',
	'EventTarget',
	'Function',
	'JSON',
	'Map',
	'Math',
	'Number',
	'Object',
	'Promise',
	'Proxy',
	'RangeError',
	'ReferenceError',
	'Reflect',
	'RegExp',
	'Request',
	'Response',
	'Set',
	'String',
	'Symbol',
	'SyntaxError',
	'TextDecoder',
	'TextEncoder',
	'TypeError',
	'DOMParser',
	'HTMLImageElement',
	'HTMLLinkElement',
	'HTMLMetaElement',
	'HTMLScriptElement',
	'HTMLStyleElement',
	'Location',
	'Node',
	'Performance',
	'Storage',
	'URLSearchParams',
	'WebSocket',
	'Document',
	'DocumentFragment',
	'Element',
	'MutationObserver',
	'PerformanceObserver',
	'URL',
	'Worker',
	'browser',
	'atob',
	'btoa',
	'clearInterval',
	'clearTimeout',
	'console',
	'decodeURI',
	'decodeURIComponent',
	'encodeURI',
	'encodeURIComponent',
	'eval',
	'globalThis',
	'parseFloat',
	'parseInt',
	'queueMicrotask',
	'setInterval',
	'setTimeout',
	'structuredClone',
	'caches',
	'chrome',
	'crypto',
	'customElements',
	'document',
	'event',
	'fetch',
	'frames',
	'history',
	'indexedDB',
	'localStorage',
	'location',
	'name',
	'navigator',
	'origin',
	'parent',
	'performance',
	'screen',
	'self',
	'sessionStorage',
	'status',
	'top',
	'window',
]);

interface SourceFileEntryType extends OxcSourceType {
	readonly relativePath: string;
}

interface NamedNodeType {
	readonly name: string;
	readonly node: OxcNodeType;
}

/** Enumerate handwritten TypeScript while leaving the generated technology registry out of the structural scan. */
function sourceFiles(): SourceFileEntryType[] {
	const files: SourceFileEntryType[] = [];
	const visit = (directory: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const path = resolve(directory, entry.name);
			const relativePath = relative(SRC_ROOT, path).replaceAll('\\', '/');
			if (entry.isDirectory()) {
				if (relativePath === GENERATED_REGISTRY_ROOT) continue;
				visit(path);
				continue;
			}
			if (extname(entry.name) !== '.ts' && extname(entry.name) !== '.tsx') continue;
			files.push({ ...parseSource(path), relativePath });
		}
	};
	visit(SRC_ROOT);
	return files;
}

/** Return every runtime binding introduced by a destructuring or identifier pattern. */
function bindingNames(pattern: unknown): readonly NamedNodeType[] {
	if (!isNode(pattern)) return [];
	const directName = identifierName(pattern);
	if (directName) return [{ name: directName, node: pattern }];
	if (pattern.type === 'RestElement') return bindingNames(pattern.argument);
	if (pattern.type === 'AssignmentPattern') return bindingNames(pattern.left);
	if (pattern.type === 'TSParameterProperty') return bindingNames(pattern.parameter);
	if (pattern.type === 'ObjectPattern') {
		const properties = Array.isArray(pattern.properties) ? pattern.properties : [];
		return properties.flatMap((property) => {
			if (!isNode(property)) return [];
			if (property.type === 'RestElement') return bindingNames(property.argument);
			return bindingNames(property.value);
		});
	}
	if (pattern.type === 'ArrayPattern') {
		const elements = Array.isArray(pattern.elements) ? pattern.elements : [];
		return elements.flatMap(bindingNames);
	}
	return [];
}

/** Return runtime declarations that can collide with imports or generated global names. */
function declarationNames(node: OxcNodeType): readonly NamedNodeType[] {
	if (node.type === 'VariableDeclarator') return bindingNames(node.id);
	if (node.type === 'CatchClause') return bindingNames(node.param);
	if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
		const ownName = node.type === 'ArrowFunctionExpression' ? [] : bindingNames(node.id);
		const parameters = Array.isArray(node.params) ? node.params.flatMap(bindingNames) : [];
		return [...ownName, ...parameters];
	}
	if (node.type === 'ClassDeclaration' || node.type === 'TSEnumDeclaration') return bindingNames(node.id);
	return [];
}

/** Collect non-type import bindings that survive into generated JavaScript. */
function importedNames(source: SourceFileEntryType): ReadonlySet<string> {
	const names = new Set<string>();
	const body = Array.isArray(source.program.body) ? source.program.body : [];
	for (const statement of body) {
		if (!isNode(statement) || statement.type !== 'ImportDeclaration' || statement.importKind === 'type') continue;
		const specifiers = Array.isArray(statement.specifiers) ? statement.specifiers : [];
		for (const specifier of specifiers) {
			if (!isNode(specifier) || specifier.importKind === 'type') continue;
			const name = identifierName(specifier.local);
			if (name) names.add(name);
		}
	}
	return names;
}

/** Unwrap an exported declaration so top-level runtime bindings remain visible to the scan. */
function exportedDeclaration(statement: OxcNodeType): OxcNodeType {
	if ((statement.type === 'ExportNamedDeclaration' || statement.type === 'ExportDefaultDeclaration') && isNode(statement.declaration)) {
		return statement.declaration;
	}
	return statement;
}

/** Return runtime values declared directly in one module scope. */
function topLevelRuntimeNames(source: SourceFileEntryType): readonly NamedNodeType[] {
	const names: NamedNodeType[] = [];
	const body = Array.isArray(source.program.body) ? source.program.body : [];
	for (const entry of body) {
		if (!isNode(entry)) continue;
		const statement = exportedDeclaration(entry);
		if (statement.type === 'VariableDeclaration') {
			const declarations = Array.isArray(statement.declarations) ? statement.declarations : [];
			for (const declaration of declarations) {
				if (isNode(declaration)) names.push(...bindingNames(declaration.id));
			}
			continue;
		}
		if (statement.type === 'FunctionDeclaration' || statement.type === 'ClassDeclaration' || statement.type === 'TSEnumDeclaration') {
			names.push(...bindingNames(statement.id));
		}
	}
	return names;
}

/** Find local runtime declarations that reuse one imported runtime binding. */
function importShadowViolations(entry: SourceFileEntryType): readonly string[] {
	const imports = importedNames(entry);
	if (imports.size === 0) return [];
	const violations: string[] = [];
	walk(entry.program, (node, ancestors) => {
		if (node.type === 'ImportDeclaration' || ancestors.some((ancestor) => ancestor.type === 'ImportDeclaration')) return;
		for (const binding of declarationNames(node)) {
			if (imports.has(binding.name)) {
				violations.push(`${entry.relativePath}:${line(entry, binding.node)} shadows imported '${binding.name}'`);
			}
		}
	});
	return violations;
}

describe('generated JavaScript name safety', () => {
	it('parses all handwritten TypeScript and TSX with Oxc', () => {
		expect(() => sourceFiles()).not.toThrow();
	});

	it('does not declare generated-runtime global names as top-level runtime values', () => {
		const violations = sourceFiles().flatMap((entry) =>
			topLevelRuntimeNames(entry)
				.filter((binding) => GENERATED_RUNTIME_GLOBAL_NAMES.has(binding.name))
				.map((binding) => `${entry.relativePath}:${line(entry, binding.node)} declares generated-runtime global '${binding.name}'`)
		);
		expect(violations).toEqual([]);
	});

	it('does not shadow imported runtime bindings with local declarations', () => {
		const violations = sourceFiles().flatMap(importShadowViolations);
		expect(violations).toEqual([]);
	});
});
