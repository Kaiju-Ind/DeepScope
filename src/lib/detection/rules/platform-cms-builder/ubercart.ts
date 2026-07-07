import type { TechnologyDefinition } from '../../types';

export const ubercartTechnologyDefinition = {
	id: "ubercart",
	name: "Ubercart",
	website: "https://www.ubercart.org",
	icon: "Ubercart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ubercart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("uc_cart\\/uc_cart_block\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ubercart:ubercart:*:*:*:*:*:*:*:*",
	},
	implies: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
