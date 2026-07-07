import type { TechnologyDefinition } from '../../types';

export const siteoriginPageBuilderTechnologyDefinition = {
	id: "siteorigin-page-builder",
	name: "SiteOrigin Page Builder",
	website: "https://siteorigin.com/page-builder",
	description: "Page Builder by SiteOrigin makes it easy to build responsive grid-based page content that adapts to mobile devices with pixel perfect accuracy.",
	icon: "SiteOrigin.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "siteorigin-page-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/siteorigin-panels\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "siteorigin-page-builder:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/siteorigin-panels/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
