import type { TechnologyDefinition } from '../../types';

export const refariTechnologyDefinition = {
	id: "refari",
	name: "Refari",
	website: "https://www.refari.co",
	description: "Refari is a platform that provides digital tools designed to streamline and support recruitment processes for hiring teams and agencies.",
	icon: "Refari.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "refari:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.refari\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "refari:jsGlobal:1",
			kind: "jsGlobal",
			property: "refari.load",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
