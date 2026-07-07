import type { TechnologyDefinition } from '../../types';

export const profilepressTechnologyDefinition = {
	id: "profilepress",
	name: "ProfilePress",
	website: "https://profilepress.net",
	description: "ProfilePress is a WordPress registration plugin that lets you create login forms, registration forms, user profiles, and more.",
	icon: "ProfilePress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "profilepress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-user-avatar(?:-pro)?\\/.+frontend\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "profilepress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/wp-user-avatar/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "profilepress:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ppwp_wp_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:properfraction:profilepress:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
