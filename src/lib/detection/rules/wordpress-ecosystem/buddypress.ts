import type { TechnologyDefinition } from '../../types';

export const buddypressTechnologyDefinition = {
	id: "buddypress",
	name: "BuddyPress",
	website: "https://buddypress.org",
	description: "BuddyPress is designed to allow schools, companies, sports teams, or any other niche community to start their own social network or communication tool.",
	icon: "BuddyPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "buddypress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/buddypress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/buddypress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/buddypress/.",
		},
		{
			id: "buddypress:resourceUrl:1",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/buddypress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/buddypress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/buddypress/.",
		},
		{
			id: "buddypress:stylesheetHref:2",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/buddypress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/buddypress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/buddypress/.",
		},
		{
			id: "buddypress:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/buddypress/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/buddypress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/buddypress/.",
		},
		{
			id: "buddypress:dom:4",
			kind: "dom",
			selector: "#buddypress, .buddypress, body.buddypress, .bp-wrap, .bp-dir-search, .bp-list, [class*='bp-activity'], [class*='bp-members']",
			description: "DOM selector matches BuddyPress community screens or component markup.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:buddypress:buddypress:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
