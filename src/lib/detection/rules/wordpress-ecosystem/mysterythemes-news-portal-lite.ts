import type { TechnologyDefinition } from '../../types';

export const mysterythemesNewsPortalLiteTechnologyDefinition = {
	id: "mysterythemes-news-portal-lite",
	name: "MysteryThemes News Portal Lite",
	website: "https://mysterythemes.com/wp-themes/news-portal-lite",
	description: "News Portal Lite is child theme of News Portal ultimate magazine WordPress theme by MysteryThemes.",
	icon: "MysteryThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mysterythemes-news-portal-lite:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/news-portal-lite/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
	excludes: [
		"mysterythemes-news-portal",
	],
} as const satisfies TechnologyDefinition;
