import type { TechnologyDefinition } from '../../types';

export const contentstackTechnologyDefinition = {
	id: "contentstack",
	name: "Contentstack",
	website: "https://www.contentstack.com",
	description: "Contentstack is a headless CMS software designed to help businesses deliver personalised content experiences to audiences via multiple channels.",
	icon: "Contentstack.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contentstack:dom:0",
			kind: "dom",
			selector: "img[src*='contentstack']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "contentstack:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.contentstack\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
