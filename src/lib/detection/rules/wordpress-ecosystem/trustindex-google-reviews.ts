import type { TechnologyDefinition } from '../../types';

export const trustindexGoogleReviewsTechnologyDefinition = {
	id: "trustindex-google-reviews",
	name: "Trustindex Google Reviews",
	website: "https://www.trustindex.io",
	description: "Google Reviews s a premium plugin that can help you to embed reviews on your site by Trustindex.",
	icon: "Trustindex.svg",
	categories: [
		"wordpress-ecosystem",
		"community-ugc",
	],
	rules: [
		{
			id: "trustindex-google-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/widget-google-reviews\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustindex-google-reviews:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/widget-google-reviews/']",
			description: "DOM selector matches a known technology marker.",
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
