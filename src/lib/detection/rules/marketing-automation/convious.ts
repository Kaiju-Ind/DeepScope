import type { TechnologyDefinition } from '../../types';

export const conviousTechnologyDefinition = {
	id: "convious",
	name: "Convious",
	website: "https://www.convious.com",
	description: "Convious is an attraction management platform supporting operations before, during, and after visits, including exit-intent functionality.",
	icon: "Convious.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "convious:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.convious-app\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convious:jsGlobal:1",
			kind: "jsGlobal",
			property: "conviousLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convious:jsGlobal:2",
			kind: "jsGlobal",
			property: "convious_resource_path",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
