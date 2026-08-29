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
		throw new Error(`${path}: Oxc parse failed:\n${result.errors.map(formatError).join('\n')}`);
	}

	return { path, text, program: result.program };
}


/** Format one structured Oxc diagnostic without collapsing it to `[object Object]`. */
function formatError(error: unknown): string {
	if (error instanceof Error) return error.stack ?? error.message;
	if (typeof error === 'string') return error;
	try {
		return JSON.stringify(error, null, 2);
	} catch {
		return String(error);
	}
}

/** Return whether an unknown AST value is an Oxc node. */
export function isNode(value: unknown): value is OxcNodeType {
	return Boolean(value && typeof value === 'object' && typeof (value as { readonly type?: unknown }).type === 'string');
}

/** Visit every descendant node while preserving the structural ancestor stack. */
export function walk(
	value: unknown,
	visit: (node: OxcNodeType, ancestors: readonly OxcNodeType[]) => void,
	ancestors: readonly OxcNodeType[] = [],
): void {
	if (!isNode(value)) return;
	const node = value;
	visit(node, ancestors);
	const nextAncestors: readonly OxcNodeType[] = [...ancestors, node];
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

/** Return static module specifiers imported by one parsed source file. */
export function importSources(source: OxcSourceType): readonly string[] {
	const imports: string[] = [];
	const body = Array.isArray(source.program.body) ? source.program.body : [];
	for (const statement of body) {
		if (!isNode(statement) || statement.type !== 'ImportDeclaration') continue;
		const value = statement.source;
		if (!isNode(value) || value.type !== 'Literal') continue;
		if (typeof value.value === 'string') imports.push(value.value);
	}
	return imports;
}

/** Return static module specifiers used by dynamic `import()` expressions. */
export function dynamicImportSources(source: OxcSourceType): readonly string[] {
	const imports: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'ImportExpression') return;
		const value = node.source;
		if (isNode(value) && value.type === 'Literal' && typeof value.value === 'string') imports.push(value.value);
	});
	return imports;
}

/** Return root component names used by JSX opening elements. */
export function jsxElementNames(source: OxcSourceType): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'JSXOpeningElement') return;
		const name = jsxRootName(node.name);
		if (name) names.push(name);
	});
	return names;
}

/** Return imported symbol names from one exact static module specifier. */
export function importedNames(source: OxcSourceType, specifier: string): readonly string[] {
	const names: string[] = [];
	const body = Array.isArray(source.program.body) ? source.program.body : [];
	for (const statement of body) {
		if (!isNode(statement) || statement.type !== 'ImportDeclaration') continue;
		const importedFrom = statement.source;
		if (!isNode(importedFrom) || importedFrom.type !== 'Literal' || importedFrom.value !== specifier) continue;
		const specifiers = Array.isArray(statement.specifiers) ? statement.specifiers : [];
		for (const imported of specifiers) {
			if (!isNode(imported)) continue;
			if (imported.type === 'ImportDefaultSpecifier') {
				names.push('default');
				continue;
			}
			if (imported.type === 'ImportNamespaceSpecifier') {
				names.push('*');
				continue;
			}
			if (imported.type !== 'ImportSpecifier') continue;
			const name = identifierName(imported.imported);
			if (name) names.push(name);
		}
	}
	return names;
}

/** Return string values for one object property passed to calls with the given target name. */
export function callObjectStringValues(source: OxcSourceType, target: string, property: string): readonly string[] {
	const values: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'CallExpression' || callName(node) !== target) return;
		const args = Array.isArray(node.arguments) ? node.arguments : [];
		const options = args[0];
		if (!isNode(options) || options.type !== 'ObjectExpression') return;
		const properties = Array.isArray(options.properties) ? options.properties : [];
		for (const entry of properties) {
			if (!isNode(entry) || entry.type !== 'Property') continue;
			if (identifierName(entry.key) !== property) continue;
			const value = entry.value;
			if (isNode(value) && value.type === 'Literal' && typeof value.value === 'string') values.push(value.value);
		}
	});
	return values;
}

/** Return whether a module imports one exact static specifier. */
export function imports(source: OxcSourceType, specifier: string): boolean {
	return importSources(source).includes(specifier);
}


/** Return every simple dotted call target in one parsed source file. */
export function callNames(source: OxcSourceType): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		const name = callName(node);
		if (name) names.push(name);
	});
	return names;
}

/** Return string-literal arguments passed to calls with one exact target name. */
export function callStringArguments(source: OxcSourceType, target: string): readonly string[] {
	const values: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'CallExpression' || callName(node) !== target) return;
		const args = Array.isArray(node.arguments) ? node.arguments : [];
		for (const argument of args) {
			if (!isNode(argument) || argument.type !== 'Literal' || typeof argument.value !== 'string') continue;
			values.push(argument.value);
		}
	});
	return values;
}

/** Return string literals that occur in executable AST nodes. */
export function stringLiterals(source: OxcSourceType): readonly string[] {
	const values: string[] = [];
	walk(source.program, (node) => {
		if (node.type === 'Literal' && typeof node.value === 'string') values.push(node.value);
	});
	return values;
}

/** Return JSX attribute names used by one TSX source file. */
export function jsxAttributeNames(source: OxcSourceType): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'JSXAttribute') return;
		const name = node.name;
		if (!isNode(name) || name.type !== 'JSXIdentifier' || typeof name.name !== 'string') return;
		names.push(name.name);
	});
	return names;
}

/** Return a dotted name for simple identifier/member expressions such as `logging.configure`. */
export function expressionName(node: unknown): string | undefined {
	if (!isNode(node)) return undefined;
	const identifier = identifierName(node);
	if (identifier) return identifier;
	if (node.type !== 'MemberExpression' && node.type !== 'OptionalMemberExpression') return undefined;
	const object = expressionName(node.object);
	const property = identifierName(node.property);
	if (!object || !property || node.computed === true) return undefined;
	return `${object}.${property}`;
}


/** Return every simple identifier/member expression name in one parsed source file. */
export function expressionNames(source: OxcSourceType): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		const name = expressionName(node);
		if (name) names.push(name);
	});
	return names;
}

/** Return static object-property names used in one parsed source file. */
export function objectPropertyNames(source: OxcSourceType): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'Property') return;
		const name = identifierName(node.key);
		if (name) names.push(name);
	});
	return names;
}

/** Return static boolean values assigned to one object property name. */
export function objectPropertyBooleanValues(source: OxcSourceType, property: string): readonly boolean[] {
	const values: boolean[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'Property' || identifierName(node.key) !== property) return;
		const value = node.value;
		if (isNode(value) && value.type === 'Literal' && typeof value.value === 'boolean') values.push(value.value);
	});
	return values;
}

/** Return call targets used as the value of one static object property. */
export function objectPropertyCallNames(source: OxcSourceType, property: string): readonly string[] {
	const names: string[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'Property' || identifierName(node.key) !== property) return;
		const name = callName(node.value);
		if (name) names.push(name);
	});
	return names;
}

/** Return numeric literal arguments passed to calls with one exact target name. */
export function callNumberArguments(source: OxcSourceType, target: string): readonly number[] {
	const values: number[] = [];
	walk(source.program, (node) => {
		if (node.type !== 'CallExpression' || callName(node) !== target) return;
		const args = Array.isArray(node.arguments) ? node.arguments : [];
		for (const argument of args) {
			if (!isNode(argument) || argument.type !== 'Literal' || typeof argument.value !== 'number') continue;
			values.push(argument.value);
		}
	});
	return values;
}

/** Return a dotted call target for a simple call expression. */
export function callName(node: unknown): string | undefined {
	if (!isNode(node) || (node.type !== 'CallExpression' && node.type !== 'NewExpression')) return undefined;
	return expressionName(node.callee);
}
