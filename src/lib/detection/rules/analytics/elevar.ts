import type { TechnologyDefinition } from '../../types';

export const elevarTechnologyDefinition = {
	id: "elevar",
	name: "Elevar",
	website: "https://www.getelevar.com",
	description: "Elevar is an official Shopify Plus Partner data collection and marketing monitoring tool.",
	icon: "Elevar.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "elevar:jsGlobal:0",
			kind: "jsGlobal",
			property: "ElevarGtmSuite",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elevar:jsGlobal:1",
			kind: "jsGlobal",
			property: "elevar_gtm_errors",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elevar:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkelevar_gtm_suite_scripts",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
