import type { TechnologyDefinition } from '../../types';

export const themegrillEstoreTechnologyDefinition = {
	id: "themegrill-estore",
	name: "ThemeGrill eStore",
	website: "https://themegrill.com/themes/estore",
	description: "ThemeGrill eStore is one of the most popular WooCommerce integrated WordPress themes.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-estore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/e(?:s|S)tore(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-estore:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("eStore v\\.([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "themegrill-estore:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/e(?:s|s)tore(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-estore:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("estore v\\.([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
