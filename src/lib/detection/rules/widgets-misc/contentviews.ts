import type { TechnologyDefinition } from '../../types';

export const contentviewsTechnologyDefinition = {
	id: "contentviews",
	name: "ContentViews",
	website: "https://wordpress.org/plugins/content-views-query-and-display-post-page/",
	description: "ContentViews is a lightweight and user-friendly WordPress Plugin, crafted specifically for efficient content management and display. This plugin offers seamless integration with Widgets and enables users to showcase their posts, pages, or custom post types in a highly responsive grid, list, or timeline layout.",
	icon: "ContentViews.svg",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "contentviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("content-views(?:-pro)?(?:-query-and-display-post-page)?(?:\\/public)?(?:\\/assets)?(?:\\/js)?(?:\\/cv(?:pro)?)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contentviews:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/content-views-query-and-display-post-page/'], link[href*='/wp-content/plugins/pt-content-views-pro/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
