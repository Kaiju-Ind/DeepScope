import { readdirSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
	identifierName,
	isNode,
	jsxRootName,
	line,
	parseSource,
	walk,
	type OxcNodeType,
	type OxcSourceType,
} from '@/tests/support/oxc';

const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const UI_ROOTS = [
	fileURLToPath(new URL('../../app', import.meta.url)),
	fileURLToPath(new URL('../../ui', import.meta.url)),
];
const MENU_GROUPS = new Map([
	['DropdownMenuLabel', 'DropdownMenuGroup'],
	['ContextMenuLabel', 'ContextMenuGroup'],
	['MenubarLabel', 'MenubarGroup'],
]);

interface SourceEntryType extends OxcSourceType {
	readonly relativePath: string;
}

/** Enumerate handwritten UI sources that can produce Solid DOM at runtime. */
function uiSources(): SourceEntryType[] {
	const files: SourceEntryType[] = [];
	const visit = (directory: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const path = resolve(directory, entry.name);
			if (entry.isDirectory()) {
				visit(path);
				continue;
			}
			if (extname(entry.name) !== '.ts' && extname(entry.name) !== '.tsx') continue;
			files.push({
				...parseSource(path),
				relativePath: relative(SRC_ROOT, path).replaceAll('\\', '/'),
			});
		}
	};
	for (const root of UI_ROOTS) visit(root);
	return files;
}

/** Return the simple name of a JSX opening element used by local wrapper components. */
function jsxName(opening: OxcNodeType): string | undefined {
	return jsxRootName(opening.name);
}

/** Return the opening element for one JSX element ancestor. */
function openingElement(node: OxcNodeType): OxcNodeType | undefined {
	return isNode(node.openingElement) ? node.openingElement : undefined;
}

/** Return every runtime identifier introduced by one binding pattern. */
function bindingNames(pattern: unknown): readonly string[] {
	if (!isNode(pattern)) return [];
	const directName = identifierName(pattern);
	if (directName) return [directName];
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

/** Return runtime bindings declared anywhere in one module so JSX references can be resolved. */
function runtimeBindings(source: SourceEntryType): ReadonlySet<string> {
	const names = new Set<string>();
	walk(source.program, (node, ancestors) => {
		if (node.type === 'ImportDeclaration' && node.importKind !== 'type') {
			const specifiers = Array.isArray(node.specifiers) ? node.specifiers : [];
			for (const specifier of specifiers) {
				if (!isNode(specifier) || specifier.importKind === 'type') continue;
				for (const name of bindingNames(specifier.local)) names.add(name);
			}
			return;
		}
		if (ancestors.some((ancestor) => ancestor.type === 'ImportDeclaration')) return;
		if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration' || node.type === 'TSEnumDeclaration') {
			for (const name of bindingNames(node.id)) names.add(name);
			return;
		}
		if (node.type === 'VariableDeclarator') {
			for (const name of bindingNames(node.id)) names.add(name);
		}
	});
	return names;
}

describe('generated UI runtime safety', () => {
	it('keeps Kobalte group labels inside their required menu groups', () => {
		const violations: string[] = [];
		for (const source of uiSources()) {
			walk(source.program, (node, ancestors) => {
				if (node.type !== 'JSXOpeningElement') return;
				const label = jsxName(node);
				if (!label) return;
				const requiredGroup = MENU_GROUPS.get(label);
				if (!requiredGroup) return;
				const grouped = ancestors.some((ancestor) => {
					if (ancestor.type !== 'JSXElement') return false;
					const opening = openingElement(ancestor);
					return opening ? jsxName(opening) === requiredGroup : false;
				});
				if (!grouped) violations.push(`${source.relativePath}:${line(source, node)} renders ${label} outside ${requiredGroup}`);
			});
		}
		expect(violations).toEqual([]);
	});

	it('does not render unbound uppercase JSX components', () => {
		const violations: string[] = [];
		for (const source of uiSources()) {
			const bindings = runtimeBindings(source);
			walk(source.program, (node) => {
				if (node.type !== 'JSXOpeningElement') return;
				const root = jsxRootName(node.name);
				if (!root || !/^[A-Z]/.test(root)) return;
				if (!bindings.has(root)) violations.push(`${source.relativePath}:${line(source, node)} renders unbound JSX component '${root}'`);
			});
		}
		expect(violations).toEqual([]);
	});

	it('keeps diagnostic virtualization on fixed rows without TanStack DOM measurement', () => {
		const source = uiSources().find((entry) => entry.relativePath === 'app/diagnostics/timeline.tsx');
		expect(source).toBeDefined();
		const text = source?.text ?? '';
		expect(text).toContain('estimateSize: () => 84');
		expect(text).toContain('const virtualRows = createMemo(');
		expect(text).not.toContain('measureElement(');
		expect(text).not.toContain('data-index=');
	});
});
