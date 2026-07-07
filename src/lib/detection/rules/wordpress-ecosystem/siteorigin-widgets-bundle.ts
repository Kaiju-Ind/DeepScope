import type { TechnologyDefinition } from '../../types';

export const siteoriginWidgetsBundleTechnologyDefinition = {
	id: "siteorigin-widgets-bundle",
	name: "SiteOrigin Widgets Bundle",
	website: "https://siteorigin.com/widgets-bundle",
	description: "SiteOrigin Widgets Bundle is a WordPress plugin that gives you all the elements you need to build modern, responsive, and engaging website pages.",
	icon: "SiteOrigin.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "siteorigin-widgets-bundle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/so-widgets-bundle\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "siteorigin-widgets-bundle:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/so-widgets-bundle/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:siteorigin:siteorigin_widgets_bundle:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
