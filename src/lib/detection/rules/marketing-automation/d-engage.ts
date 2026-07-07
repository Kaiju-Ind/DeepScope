import type { TechnologyDefinition } from '../../types';

export const dEngageTechnologyDefinition = {
	id: "d-engage",
	name: "D.Engage",
	website: "https://dengage.com",
	description: "D. Engage is a platform that enhances customer experiences by leveraging data-driven marketing automation to deliver targeted and efficient campaigns.",
	icon: "Dengage.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "d-engage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pcdn\\.dengage\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "d-engage:jsGlobal:1",
			kind: "jsGlobal",
			property: "_dengageConf",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "d-engage:jsGlobal:2",
			kind: "jsGlobal",
			property: "dengage.q",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
