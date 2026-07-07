import type { TechnologyDefinition } from '../../types';

export const aubergeTechnologyDefinition = {
	id: "auberge",
	name: "Auberge",
	website: "https://www.webmandesign.eu/portfolio/auberge-wordpress-theme/",
	description: "Auberge is a responsive WordPress theme designed for restaurants, cafes, and recipe blogs.",
	icon: "Auberge.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "auberge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/auberge\\/.+\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "auberge:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/auberge/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
