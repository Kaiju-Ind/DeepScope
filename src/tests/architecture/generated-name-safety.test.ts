import { readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as ts from 'typescript';
import { describe, expect, it } from 'vitest';

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

type SourceFileEntryType = {
	readonly path: string;
	readonly relativePath: string;
	readonly source: ts.SourceFile;
};

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
			const text = readFileSync(path, 'utf8');
			files.push({
				path,
				relativePath,
				source: ts.createSourceFile(
					path,
					text,
					ts.ScriptTarget.Latest,
					true,
					entry.name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
				),
			});
		}
	};
	visit(SRC_ROOT);
	return files;
}

function bindingNames(name: ts.BindingName | ts.Identifier | undefined): readonly ts.Identifier[] {
	if (!name) return [];
	if (ts.isIdentifier(name)) return [name];
	return name.elements.flatMap((element) => ts.isOmittedExpression(element) ? [] : bindingNames(element.name));
}

function declarationNames(node: ts.Node): readonly ts.Identifier[] {
	if (ts.isVariableDeclaration(node) || ts.isParameter(node)) return bindingNames(node.name);
	if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) {
		return node.name ? [node.name] : [];
	}
	if (ts.isCatchClause(node)) return bindingNames(node.variableDeclaration?.name);
	return [];
}

function line(source: ts.SourceFile, node: ts.Node): number {
	return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}

function importedNames(source: ts.SourceFile): ReadonlySet<string> {
	const names = new Set<string>();
	for (const statement of source.statements) {
		if (!ts.isImportDeclaration(statement)) continue;
		const clause = statement.importClause;
		if (!clause) continue;
		if (clause.name) names.add(clause.name.text);
		const bindings = clause.namedBindings;
		if (bindings && ts.isNamespaceImport(bindings)) names.add(bindings.name.text);
		if (bindings && ts.isNamedImports(bindings)) {
			for (const element of bindings.elements) names.add(element.name.text);
		}
	}
	return names;
}

function topLevelRuntimeNames(source: ts.SourceFile): readonly ts.Identifier[] {
	const names: ts.Identifier[] = [];
	for (const statement of source.statements) {
		if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) {
			if (statement.name) names.push(statement.name);
			continue;
		}
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			names.push(...bindingNames(declaration.name));
		}
	}
	return names;
}

function importShadowViolations(entry: SourceFileEntryType): readonly string[] {
	const imports = importedNames(entry.source);
	if (imports.size === 0) return [];
	const violations: string[] = [];
	const visit = (node: ts.Node): void => {
		if (!ts.isImportDeclaration(node)) {
			for (const name of declarationNames(node)) {
				if (imports.has(name.text)) {
					violations.push(`${entry.relativePath}:${line(entry.source, name)} shadows imported '${name.text}'`);
				}
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(entry.source);
	return violations;
}

describe('generated JavaScript name safety', () => {
	it('does not declare generated-runtime global names as top-level runtime values', () => {
		const violations = sourceFiles().flatMap((entry) =>
			topLevelRuntimeNames(entry.source)
				.filter((name) => GENERATED_RUNTIME_GLOBAL_NAMES.has(name.text))
				.map((name) => `${entry.relativePath}:${line(entry.source, name)} declares generated-runtime global '${name.text}'`)
		);

		expect(violations).toEqual([]);
	});

	it('does not shadow imported bindings with local declarations', () => {
		const violations = sourceFiles().flatMap(importShadowViolations);
		expect(violations).toEqual([]);
	});
});
