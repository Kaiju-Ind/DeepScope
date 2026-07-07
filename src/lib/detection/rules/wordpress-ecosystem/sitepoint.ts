import type { TechnologyDefinition } from '../../types';

export const sitepointTechnologyDefinition = {
	id: "sitepoint",
	name: "SitePoint",
	website: "https://www.sitepoint.com/wordpress",
	description: "Sitepoint is a platform for creating beautiful and responsive custom WordPress themes.",
	icon: "SitePoint.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "sitepoint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/sitepoint-base\\/js\\/vendors(?:\\.min)?\\.js\\?ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitepoint:dom:1",
			kind: "dom",
			selector: "script#sitepoint-base-vendors-js",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
