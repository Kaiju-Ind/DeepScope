import type { TechnologyDefinition } from '../../types';

export const kEcommerceTechnologyDefinition = {
	id: "k-ecommerce",
	name: "k-eCommerce",
	website: "https://www.k-ecommerce.com",
	description: "k-eCommerce is mdf commerce’s platform for SMBs, providing all-in-one ecommerce and digital payment solutions integrated to Microsoft Dynamics and SAP Business One.",
	icon: "k-eCommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "k-ecommerce:dom:0",
			kind: "dom",
			selector: "a[href*='.k-ecommerce.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "k-ecommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("k-eCommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "k-ecommerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("k-ecommerce", "i"),
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
