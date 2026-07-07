import type { TechnologyDefinition } from '../../types';

export const conduitTechnologyDefinition = {
	id: "conduit",
	name: "Conduit",
	website: "https://conduit.io",
	description: "Conduit is a data integration tool designed to synchronize production systems through an extensible, event-first approach with minimal dependencies for integration into existing workflows.",
	icon: "Conduit.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "conduit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.conduit\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:conduit:conduit:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
