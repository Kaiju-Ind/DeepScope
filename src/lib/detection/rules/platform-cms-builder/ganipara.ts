import type { TechnologyDefinition } from '../../types';

export const ganiparaTechnologyDefinition = {
	id: "ganipara",
	name: "GaniPara",
	website: "https://ganipara.com/planlar",
	description: "GaniPara is a hosted ecommerce solution based in Turkey, providing infrastructure for setting up and managing online stores.",
	icon: "GaniPara.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ganipara:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ganipara\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ganipara:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^Ganipara$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ganipara:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^ganipara$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
