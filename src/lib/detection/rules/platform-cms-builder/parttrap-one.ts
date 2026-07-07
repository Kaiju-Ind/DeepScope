import type { TechnologyDefinition } from '../../types';

export const parttrapOneTechnologyDefinition = {
	id: "parttrap-one",
	name: "Parttrap ONE",
	website: "https://www.parttrap.com",
	description: "Parttrap ONE is a complete solution including PIM, CMS, business optimization and ERP integration.",
	icon: "Parttrap.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "parttrap-one:jsGlobal:0",
			kind: "jsGlobal",
			property: "PT.Analytics.addItem",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "parttrap-one:jsGlobal:1",
			kind: "jsGlobal",
			property: "PT.Sections.Checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "parttrap-one:jsGlobal:2",
			kind: "jsGlobal",
			property: "PT.Translation.BasketIsEmpty",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"bootstrap",
		"handlebars",
		"microsoft-asp-net",
	],
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
