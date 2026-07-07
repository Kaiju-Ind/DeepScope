import type { TechnologyDefinition } from '../../types';

export const typerJsTechnologyDefinition = {
	id: "typer-js",
	name: "Typer.js",
	website: "https://github.com/straversi/Typer.js",
	description: "Typer.js is a JavaScript library for creating a fully configurable typing effect in HTML.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "typer-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg\\.com\\/typer-dot-js@([\\d\\.]+)\\/typer\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
