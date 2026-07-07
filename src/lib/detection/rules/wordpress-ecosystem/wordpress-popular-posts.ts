import type { TechnologyDefinition } from '../../types';

export const wordpressPopularPostsTechnologyDefinition = {
	id: "wordpress-popular-posts",
	name: "WordPress Popular Posts",
	website: "https://wordpress.org/plugins/wordpress-popular-posts/",
	description: "WordPress Popular Posts is a plugin for the WordPress content management system that allows users to display a widget or shortcode featuring a list of the most popular posts on their website based on criteria such as pageviews or comments.",
	icon: "WordPress Popular Posts.svg",
	categories: [
		"wordpress-ecosystem",
		"widgets-misc",
	],
	rules: [
		{
			id: "wordpress-popular-posts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wordpress-popular-posts\\/.+wpp\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:wordpress_popular_posts_project:wordpress_popular_posts:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
