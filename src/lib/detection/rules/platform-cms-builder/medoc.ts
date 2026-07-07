import type { TechnologyDefinition } from '../../types';

export const medocTechnologyDefinition = {
	id: "medoc",
	name: "Medoc",
	website: "https://medoc.co.uk",
	description: "Medoc is a retail and ecommerce system.",
	icon: "Medoc.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "medoc:meta:0",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Copyright \\(C\\) \\d{4}-\\d{4} Medoc Computers Ltd", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "medoc:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("copyright \\(c\\) \\d{4}-\\d{4} medoc computers ltd", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
