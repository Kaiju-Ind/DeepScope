import type { TechnologyDefinition } from '../../types';

export const recentPostsWidgetWithThumbnailsTechnologyDefinition = {
	id: "recent-posts-widget-with-thumbnails",
	name: "Recent Posts Widget With Thumbnails",
	website: "https://wordpress.org/plugins/recent-posts-widget-with-thumbnails/",
	description: "Recent Posts Widget With Thumbnails is based on the well-known WordPress default widget 'Recent Posts' and extended to display more informations about the posts.",
	icon: "Recent Posts Widget With Thumbnails.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "recent-posts-widget-with-thumbnails:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/recent-posts-widget-with-thumbnails/']",
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
