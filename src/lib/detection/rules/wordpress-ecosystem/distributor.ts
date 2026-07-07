import type { TechnologyDefinition } from '../../types';

export const distributorTechnologyDefinition = {
	id: "distributor",
	name: "Distributor",
	website: "https://distributorplugin.com",
	description: "Distributor is a WordPress plugin that helps distribute and reuse content across your websites.",
	icon: "distributor.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "distributor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/distributor"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "distributor:header:1",
			kind: "header",
			key: "x-distributor",
			valuePattern: new RegExp("yes", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
