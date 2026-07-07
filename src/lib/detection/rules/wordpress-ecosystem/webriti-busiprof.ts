import type { TechnologyDefinition } from '../../types';

export const webritiBusiprofTechnologyDefinition = {
	id: "webriti-busiprof",
	name: "Webriti Busiprof",
	website: "https://webriti.com/busiprof-premium-wordpress-theme-1",
	description: "Busiprof is a fully responsive and translation-ready WordPress theme by Webriti.",
	icon: "Webriti.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "webriti-busiprof:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/busiprof(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
