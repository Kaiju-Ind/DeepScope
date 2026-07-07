import type { TechnologyDefinition } from '../../types';

export const wewebTechnologyDefinition = {
	id: "weweb",
	name: "WeWeb",
	website: "https://www.weweb.io",
	description: "WeWeb is a no-code front-end builder that allows customers to build on-top of any back-end.",
	icon: "WeWeb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weweb:jsGlobal:0",
			kind: "jsGlobal",
			property: "wwg_designInfo.wewebPreviewURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
