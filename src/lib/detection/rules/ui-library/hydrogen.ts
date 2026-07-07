import type { TechnologyDefinition } from '../../types';

export const hydrogenTechnologyDefinition = {
	id: "hydrogen",
	name: "Hydrogen",
	website: "https://hydrogen.shopify.dev",
	description: "Hydrogen is a front-end web development framework used for building Shopify custom storefronts.",
	icon: "Hydrogen.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "hydrogen:header:0",
			kind: "header",
			key: "powered-by",
			valuePattern: new RegExp("^Shopify-Hydrogen$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hydrogen:header:1",
			kind: "header",
			key: "powered-by",
			valuePattern: new RegExp("^Hydrogen$|Shopify.+Hydrogen", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hydrogen:header:2",
			kind: "header",
			key: "powered-by",
			valuePattern: new RegExp("^hydrogen$|shopify.+hydrogen", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"react",
		"shopify",
		"vite",
	],
} as const satisfies TechnologyDefinition;
