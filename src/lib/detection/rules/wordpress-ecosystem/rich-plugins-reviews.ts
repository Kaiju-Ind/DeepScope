import type { TechnologyDefinition } from '../../types';

export const richPluginsReviewsTechnologyDefinition = {
	id: "rich-plugins-reviews",
	name: "Rich Plugins Reviews",
	website: "https://richplugins.com/business-reviews-bundle-wordpress-plugin",
	description: "Rich Plugins Reviews is a WordPress plugin that integrates verified reviews from trusted sources such as Google and Facebook.",
	icon: "Rich Plugins.svg",
	categories: [
		"wordpress-ecosystem",
		"community-ugc",
	],
	rules: [
		{
			id: "rich-plugins-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/widget-google-reviews\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rich-plugins-reviews:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/widget-google-reviews/']",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
