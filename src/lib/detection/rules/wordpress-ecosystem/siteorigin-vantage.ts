import type { TechnologyDefinition } from '../../types';

export const siteoriginVantageTechnologyDefinition = {
	id: "siteorigin-vantage",
	name: "SiteOrigin Vantage",
	website: "https://siteorigin.com/theme/vantage",
	description: "SiteOrigin Vantage is a response, multi-purpose theme carefully developed with seamless integration into an array of amazing third-party plugins.",
	icon: "SiteOrigin.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "siteorigin-vantage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/vantage\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "siteorigin-vantage:dom:1",
			kind: "dom",
			selector: "style#vantage-style-css",
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
