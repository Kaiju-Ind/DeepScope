import type { TechnologyDefinition } from '../../types';

export const betterdocsTechnologyDefinition = {
	id: "betterdocs",
	name: "BetterDocs",
	website: "https://betterdocs.co",
	description: "BetterDocs is an advanced documentation and knowledge base plugin for WordPress and Shopify.",
	icon: "BetterDocs.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "betterdocs:jsGlobal:0",
			kind: "jsGlobal",
			property: "betterdocs.FEEDBACK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "betterdocs:jsGlobal:1",
			kind: "jsGlobal",
			property: "betterdocs_pro.FEEDBACK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "betterdocs:jsGlobal:2",
			kind: "jsGlobal",
			property: "betterdocspublic.post_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
