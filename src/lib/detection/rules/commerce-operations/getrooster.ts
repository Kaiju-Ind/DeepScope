import type { TechnologyDefinition } from '../../types';

export const getroosterTechnologyDefinition = {
	id: "getrooster",
	name: "GetRooster",
	website: "https://www.getrooster.com",
	description: "GetRooster is a system designed to optimise the conversion of abandoning visitors.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "getrooster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/app\\.getrooster\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getrooster:jsGlobal:1",
			kind: "jsGlobal",
			property: "_GT_config.gt_host",
			valuePattern: new RegExp("\\/\\/app\\.getrooster\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
