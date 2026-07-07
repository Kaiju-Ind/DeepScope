import type { TechnologyDefinition } from '../../types';

export const lifterlmsTechnologyDefinition = {
	id: "lifterlms",
	name: "LifterLMS",
	website: "https://lifterlms.com",
	description: "LifterLMS is a learning management system plugin for WordPress.",
	icon: "LifterLMS.svg",
	categories: [
		"content-publishing",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "lifterlms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/plugins\\/lifterlms\\/assets\\/js\\/llms\\.min\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lifterlms:dom:1",
			kind: "dom",
			selector: "link#lifterlms-styles-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
