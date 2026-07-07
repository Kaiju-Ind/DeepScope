import type { TechnologyDefinition } from '../../types';

export const clickdimensionsTechnologyDefinition = {
	id: "clickdimensions",
	name: "ClickDimensions",
	website: "https://clickdimensions.com",
	description: "ClickDimensions is a SaaS marketing automation platform built on the Microsoft Windows Azure platform.",
	icon: "ClickDimensions.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "clickdimensions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.clickdimensions\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clickdimensions:jsGlobal:1",
			kind: "jsGlobal",
			property: "clickdimensions",
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
