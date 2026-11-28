import type { TechnologyDefinition } from "../../types.ts";

/**
 * Second source fragment for `ember-js`. It was a separate `ember` id, so one
 * product was reported twice; the registry merges fragments that share an id.
 */
export const emberTechnologyDefinition: TechnologyDefinition = {
	id: 'ember-js',
	name: 'Ember',
	website: 'https://emberjs.com/',
	description: 'A JavaScript framework for building web applications',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'ember-js:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('@ember\\/-internals\\/[a-zA-Z-]+'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:1',
			kind: 'scriptContent',
			pattern: new RegExp(
				'defineProperty\\(Ember,["\']VERSION["\'],\\{configurable:!1,enumerable:!0,value:["\']\\d+\\.\\d+\\.\\d+["\']\\}\\)',
			),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:2',
			kind: 'scriptContent',
			pattern: new RegExp('Ember - JavaScript Application Framework'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:3',
			kind: 'scriptContent',
			pattern: new RegExp('notifyPropertyChange\\(this,["\'][^"\']+["\']\\)'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:4',
			kind: 'scriptContent',
			pattern: new RegExp('define\\([\'"]@ember\\/[^"\']+["\']'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:5',
			kind: 'scriptContent',
			pattern: new RegExp("'EMBER_LOAD_HOOKS'"),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:6',
			kind: 'scriptContent',
			pattern: new RegExp('deprecations\\.emberjs\\.com'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:7',
			kind: 'scriptContent',
			pattern: new RegExp('function\\s*\\(global,\\s*Ember\\)'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:8',
			kind: 'scriptContent',
			pattern: new RegExp('define\\([\'"]([@]glimmer\\/[^"\']+)["\']'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:9',
			kind: 'scriptContent',
			pattern: new RegExp('setComponentTemplate\\((\\w+),class extends(\\w+\\.)?Component\\{'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:10',
			kind: 'scriptContent',
			pattern: new RegExp('createTemplateFactory\\(\\{id:["\'][^"\']+["\'],block:'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:11',
			kind: 'scriptContent',
			pattern: new RegExp('Component\\.extend\\(\\{(?:[^{}]|{[^{}]*})*\\}\\)'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:12',
			kind: 'scriptContent',
			pattern: new RegExp('function\\(\\){return\\{\\w+:function\\(\\)\\{var \\w+=this\\.\\w+'),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'ember-js:scriptContent:modern:13',
			kind: 'scriptContent',
			pattern: new RegExp('createTemplateFactory\\(\\{[^}]*"block":\\['),
			confidence: 45,
			description: 'Bundled script content matches a modern tooling marker.',
		},
	],
} as const satisfies TechnologyDefinition;
