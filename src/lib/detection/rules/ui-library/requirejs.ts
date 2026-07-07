import type { TechnologyDefinition } from '../../types';

export const requirejsTechnologyDefinition = {
	id: "requirejs",
	name: "RequireJS",
	website: "https://requirejs.org",
	description: "RequireJS is a JavaScript library and file loader which manages the dependencies between JavaScript files and in modular programming.",
	icon: "RequireJS.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "requirejs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("require.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "requirejs:jsGlobal:1",
			kind: "jsGlobal",
			property: "requirejs.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:requirejs:requirejs:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
