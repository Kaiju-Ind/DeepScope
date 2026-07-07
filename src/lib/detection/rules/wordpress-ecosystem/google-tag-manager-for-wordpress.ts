import type { TechnologyDefinition } from '../../types';

export const googleTagManagerForWordpressTechnologyDefinition = {
	id: "google-tag-manager-for-wordpress",
	name: "Google Tag Manager for WordPress",
	website: "https://gtm4wp.com",
	description: "Google Tag Manager for WordPress plugin places the GTM container code snippets onto your wordpress website so that you do not need to add this manually.",
	icon: "Google Tag Manager for WordPress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "google-tag-manager-for-wordpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/duracelltomi-google-tag-manager\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-tag-manager-for-wordpress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/duracelltomi-google-tag-manager/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"google-tag-manager",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
