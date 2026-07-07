import type { TechnologyDefinition } from '../../types';

export const eComPlusTechnologyDefinition = {
	id: "e-com-plus",
	name: "E-Com Plus",
	website: "https://www.ecomplus.io",
	description: "E-Com Plus is an open fair-code ecommerce platform designed to be used with headless commerce APIs.",
	icon: "E-Com Plus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "e-com-plus:jsGlobal:0",
			kind: "jsGlobal",
			property: "ecomPassport.storageKey",
			valuePattern: new RegExp("ecomPassportClient"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "e-com-plus:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^E-Com\\sPlus\\sStorefront$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "e-com-plus:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^e-com\\splus\\sstorefront$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
	implies: [
		"typescript",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
