import type { TechnologyDefinition } from '../../types';

export const yoapressTechnologyDefinition = {
	id: "yoapress",
	name: "YOAPress",
	website: "https://yoapress.com",
	description: "YOAPress is a SaaS platform that provides website building solutions tailored for real estate professionals.",
	icon: "YOAPress.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yoapress:dom:0",
			kind: "dom",
			selector: "link[href*='//api.yoa.ca']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoapress:jsGlobal:1",
			kind: "jsGlobal",
			property: "yoa_cache_clear",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yoapress:jsGlobal:2",
			kind: "jsGlobal",
			property: "yoa_gallary",
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
