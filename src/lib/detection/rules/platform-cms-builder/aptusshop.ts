import type { TechnologyDefinition } from '../../types';

export const aptusshopTechnologyDefinition = {
	id: "aptusshop",
	name: "AptusShop",
	website: "https://www.aptusshop.pl",
	description: "AptusShop is proprietary online store software created from scratch and developed by Aptus.pl.",
	icon: "AptusShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aptusshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AptusShop\\.pl$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aptusshop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^aptusshop\\.pl$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
