import type { TechnologyDefinition } from '../../types';

export const rankmathSeoTechnologyDefinition = {
	id: "rankmath-seo",
	name: "RankMath SEO",
	website: "https://rankmath.com",
	description: "RankMath SEO is a search engine optimisation plugin for WordPress.",
	icon: "RankMath SEO.svg",
	categories: [
		"wordpress-ecosystem",
		"marketing-automation",
	],
	rules: [
		{
			id: "rankmath-seo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/seo-by-rank-math(?:-pro)?\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rankmath-seo:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/seo-by-rank-math/'], script.rank-math-schema-pro, script.rank-math-schema",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
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
