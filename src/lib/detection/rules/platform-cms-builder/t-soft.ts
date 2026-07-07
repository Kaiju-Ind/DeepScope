import type { TechnologyDefinition } from '../../types';

export const tSoftTechnologyDefinition = {
	id: "t-soft",
	name: "T-Soft",
	website: "https://www.tsoft.com.tr/",
	description: "T-Soft is a SaaS-based ecommerce platform developed in Turkey, offering a modular architecture with support for B2B and B2C transactions, API integrations, and payment processing.",
	icon: "Tsoft.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "t-soft:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"http:\\/\\/www\\.tsoft\\.com\\.tr\" target=\"_blank\" title=\"T-Soft E-ticaret Sistemleri\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "t-soft:dom:1",
			kind: "dom",
			selector: "a[href*='.tsoft.com.tr'][target='_blank'][title='T-Soft E-ticaret Sistemleri']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "t-soft:jsGlobal:2",
			kind: "jsGlobal",
			property: "TSOFT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "t-soft:jsGlobal:3",
			kind: "jsGlobal",
			property: "TSOFT_APPS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "t-soft:meta:4",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^T-Soft E-Ticaret Sistemleri$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "t-soft:html:5",
			kind: "html",
			pattern: new RegExp("<a href=\"http:\\/\\/www\\.tsoft\\.com\\.tr\" target=\"_blank\" title=\"t-soft e-ticaret sistemleri\">"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
