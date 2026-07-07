import type { TechnologyDefinition } from '../../types';

export const ekmTechnologyDefinition = {
	id: "ekm",
	name: "EKM",
	website: "https://www.ekm.com",
	description: "EKM is an all-in-one online store builder, with the company based in the UK.",
	icon: "EKM.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ekm:jsGlobal:0",
			kind: "jsGlobal",
			property: "_ekmpinpoint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ekm:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ekmpowershop$", "i"),
			description: "Cookie name matches a known technology marker.",
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
