import type { TechnologyDefinition } from '../../types';

export const bethemeTechnologyDefinition = {
	id: "betheme",
	name: "BeTheme",
	website: "https://www.betheme.com",
	description: "BeTheme is a collection of WordPress themes developed by Muffin Group.",
	icon: "BeTheme.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "betheme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/betheme\\/js\\/scripts(?:\\.min)?\\.js\\?ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
