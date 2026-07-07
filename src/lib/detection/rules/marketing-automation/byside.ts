import type { TechnologyDefinition } from '../../types';

export const bysideTechnologyDefinition = {
	id: "byside",
	name: "BySide",
	website: "https://byside.com",
	description: "BySide is a personalisation and marketing automation platform.",
	icon: "BySide.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "byside:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webcare\\.byside\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "byside:jsGlobal:1",
			kind: "jsGlobal",
			property: "BySide",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "byside:jsGlobal:2",
			kind: "jsGlobal",
			property: "bysideWebcare_banner",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
