import type { TechnologyDefinition } from '../../types';

export const impreseeTechnologyDefinition = {
	id: "impresee",
	name: "Impresee",
	website: "https://impresee.com",
	description: "Impresee is a tool that enhances ecommerce by providing an actionable search bar to improve product discovery and user navigation.",
	icon: "Impresee.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "impresee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.impresee\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "impresee:jsGlobal:1",
			kind: "jsGlobal",
			property: "impreseeBarColor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "impresee:jsGlobal:2",
			kind: "jsGlobal",
			property: "impreseeBarFontColor",
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
