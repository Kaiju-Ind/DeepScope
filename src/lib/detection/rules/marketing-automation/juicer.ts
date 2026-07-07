import type { TechnologyDefinition } from '../../types';

export const juicerTechnologyDefinition = {
	id: "juicer",
	name: "Juicer",
	website: "https://www.juicer.io",
	description: "Juicer is a tool that aggregates brand hashtags and social media posts into a unified feed for websites, enabling moderation and content curation.",
	icon: "Juicer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "juicer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.juicer\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "juicer:jsGlobal:1",
			kind: "jsGlobal",
			property: "Juicer.Active",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "juicer:jsGlobal:2",
			kind: "jsGlobal",
			property: "JuicerBackbone.$",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
