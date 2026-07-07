import type { TechnologyDefinition } from '../../types';

export const felmatTechnologyDefinition = {
	id: "felmat",
	name: "Felmat",
	website: "https://www.felmat.net/",
	description: "Felmat is an advertising network that connects advertisers with publishers to facilitate performance-based marketing across digital platforms.",
	icon: "Felmat.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "felmat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.felmat\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "felmat:jsGlobal:1",
			kind: "jsGlobal",
			property: "felmat_report_conversion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
