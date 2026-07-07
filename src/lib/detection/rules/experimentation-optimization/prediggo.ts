import type { TechnologyDefinition } from '../../types';

export const prediggoTechnologyDefinition = {
	id: "prediggo",
	name: "Prediggo",
	website: "https://prediggo.com",
	description: "Prediggo is an ecommerce personalisation and marketing automation software provider.",
	icon: "Prediggo.png",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "prediggo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/prediggo\\/(?:[\\w]+)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prediggo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Prediggo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prediggo:jsGlobal:2",
			kind: "jsGlobal",
			property: "PrediggoSearchFormExternalAc",
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
