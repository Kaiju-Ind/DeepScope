import type { TechnologyDefinition } from '../../types';

export const bambuserTechnologyDefinition = {
	id: "bambuser",
	name: "Bambuser",
	website: "https://bambuser.com",
	description: "Bambuser is a SaaS company based in Stockholm that provides live video shopping technology.",
	icon: "Bambuser.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bambuser:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bambuser\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bambuser:jsGlobal:1",
			kind: "jsGlobal",
			property: "BambuserLiveShopping",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bambuser:jsGlobal:2",
			kind: "jsGlobal",
			property: "_bambuser",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
