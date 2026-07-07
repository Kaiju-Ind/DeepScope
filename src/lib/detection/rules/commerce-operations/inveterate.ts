import type { TechnologyDefinition } from '../../types';

export const inveterateTechnologyDefinition = {
	id: "inveterate",
	name: "Inveterate",
	website: "https://www.inveterate.com",
	description: "Inveterate is a loyalty platform designed to support flexible, scalable loyalty programs across various industries.",
	icon: "Inveterate.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "inveterate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.inveterate\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inveterate:jsGlobal:1",
			kind: "jsGlobal",
			property: "Inveterate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inveterate:jsGlobal:2",
			kind: "jsGlobal",
			property: "inveterate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
