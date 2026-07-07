import type { TechnologyDefinition } from '../../types';

export const mysterythemesNewsPortalMagTechnologyDefinition = {
	id: "mysterythemes-news-portal-mag",
	name: "MysteryThemes News Portal Mag",
	website: "https://mysterythemes.com/wp-themes/news-portal-mag",
	description: "News Portal Mag is child theme of News Portal ultimate magazine WordPress theme by MysteryThemes.",
	icon: "MysteryThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mysterythemes-news-portal-mag:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/news-portal-mag/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
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
