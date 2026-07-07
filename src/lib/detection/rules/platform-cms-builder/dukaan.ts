import type { TechnologyDefinition } from '../../types';

export const dukaanTechnologyDefinition = {
	id: "dukaan",
	name: "Dukaan",
	website: "https://mydukaan.io",
	description: "Dukaan is a hosted ecommerce solution made in India.",
	icon: "Dukaan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dukaan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.mydukaan\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dukaan:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^MyDukaan$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dukaan:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^mydukaan$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
