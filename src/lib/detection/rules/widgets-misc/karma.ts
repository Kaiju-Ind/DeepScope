import type { TechnologyDefinition } from '../../types';

export const karmaTechnologyDefinition = {
	id: "karma",
	name: "Karma",
	website: "https://karma-runner.github.io",
	description: "Karma is a test runner for JavaScript that runs on Node.js.",
	icon: "Karma.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "karma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("karma\\.mdpcdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "karma:jsGlobal:1",
			kind: "jsGlobal",
			property: "karma.vars.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:karma_project:karma:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
