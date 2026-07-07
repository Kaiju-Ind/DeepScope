import type { TechnologyDefinition } from '../../types';

export const searchfitTechnologyDefinition = {
	id: "searchfit",
	name: "SearchFit",
	website: "https://www.searchfit.com",
	description: "Searchfit provides top ecommerce software, solutions and ecommerce website design for enterprise and mid-level retailers.",
	icon: "SearchFit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "searchfit:jsGlobal:0",
			kind: "jsGlobal",
			property: "SFUI.Checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "searchfit:meta:1",
			kind: "meta",
			key: "generation-copyright",
			valuePattern: new RegExp("by\\sSearchFit\\sShopping\\sCart\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "searchfit:meta:2",
			kind: "meta",
			key: "generation-copyright",
			valuePattern: new RegExp("by\\ssearchfit\\sshopping\\scart\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
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
