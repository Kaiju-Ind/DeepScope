import type { TechnologyDefinition } from '../../types';

export const salyTechnologyDefinition = {
	id: "saly",
	name: "Saly",
	website: "https://saly.pl",
	description: "Saly is an enterprise-class B2B ecommerce platform. Dedicated to solving problems faced by manufacturers, wholesalers and distributors.",
	icon: "Saly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "saly:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Saly\\sB2B\\sPlatform$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "saly:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^saly\\sb2b\\splatform$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"php",
		"svelte",
	],
} as const satisfies TechnologyDefinition;
