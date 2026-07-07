import type { TechnologyDefinition } from '../../types';

export const wpPagenaviTechnologyDefinition = {
	id: "wp-pagenavi",
	name: "WP-PageNavi",
	website: "https://github.com/lesterchan/wp-pagenavi",
	description: "WP-PageNavi is a WordPress plugin which adds a more advanced paging navigation interface to your WordPress blog.",
	icon: "WP-PageNavi.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-pagenavi:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/wp-pagenavi/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
