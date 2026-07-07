import type { TechnologyDefinition } from '../../types';

export const semrushTechnologyDefinition = {
	id: "semrush",
	name: "SEMrush",
	website: "https://www.semrush.com",
	description: "SEMrush is an all-in-one tool suite for improving online visibility and discovering marketing insights.",
	icon: "SEMrush.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "semrush:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.semrush\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "semrush:jsGlobal:1",
			kind: "jsGlobal",
			property: "SEMRUSH",
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
