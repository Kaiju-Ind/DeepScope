import type { TechnologyDefinition } from '../../types';

export const reqruitingTechnologyDefinition = {
	id: "reqruiting",
	name: "ReQruiting",
	website: "https://www.reqruiting.com",
	description: "ReQruiting is a platform that automates core HR and recruitment processes, including job postings, candidate tracking, and hiring workflow management.",
	icon: "ReQruiting.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "reqruiting:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.reqruiting\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reqruiting:jsGlobal:1",
			kind: "jsGlobal",
			property: "reqruiting.buildUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reqruiting:jsGlobal:2",
			kind: "jsGlobal",
			property: "reqruitingApplyButtonText",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
