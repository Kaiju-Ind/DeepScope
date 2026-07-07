import type { TechnologyDefinition } from '../../types';

export const cubynTechnologyDefinition = {
	id: "cubyn",
	name: "Cubyn",
	website: "https://www.cubyn.com",
	description: "Cubyn is B2B logistics company headquartered in France.",
	icon: "Cubyn.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cubyn:text:0",
			kind: "text",
			pattern: new RegExp("\\bCubyn\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "cubyn:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cubyn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cubyn:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.cubyn\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
