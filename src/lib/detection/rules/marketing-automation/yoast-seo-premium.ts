import type { TechnologyDefinition } from '../../types';

export const yoastSeoPremiumTechnologyDefinition = {
	id: "yoast-seo-premium",
	name: "Yoast SEO Premium",
	website: "https://yoast.com/wordpress/plugins/seo/",
	description: "Yoast SEO Premium is a search engine optimisation plugin for WordPress and other platforms.",
	icon: "Yoast SEO.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "yoast-seo-premium:html:0",
			kind: "html",
			pattern: new RegExp("<!-- This site is optimized with the Yoast SEO Premium plugin v([^\\s]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yoast-seo-premium:html:1",
			kind: "html",
			pattern: new RegExp("<!-- this site is optimized with the yoast seo premium plugin v([^\\s]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
