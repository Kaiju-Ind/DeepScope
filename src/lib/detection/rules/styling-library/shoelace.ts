import type { TechnologyDefinition } from '../../types';

export const shoelaceTechnologyDefinition = {
	id: "shoelace",
	name: "Shoelace",
	website: "https://shoelace.style",
	description: "Shoelace is an open-source, framework-agnostic component for building accessible web applications.",
	icon: "Shoelace.svg",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "shoelace:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/@shoelace-style\\/shoelace@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoelace:dom:1",
			kind: "dom",
			selector: "html[data-shoelace-version]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
