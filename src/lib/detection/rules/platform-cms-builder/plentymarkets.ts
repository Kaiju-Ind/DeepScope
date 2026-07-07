import type { TechnologyDefinition } from '../../types';

export const plentymarketsTechnologyDefinition = {
	id: "plentymarkets",
	name: "plentymarkets",
	website: "https://www.plentymarkets.com/",
	description: "plentymarkets is a cloud-based all-in-one ecommerce ERP solution.",
	icon: "plentymarkets.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plentymarkets:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plenty\\.shop\\.(?:min\\.)?js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plentymarkets:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("plentymarkets", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
