import type { TechnologyDefinition } from '../../types';

export const yoastSeoTechnologyDefinition = {
	id: "yoast-seo",
	name: "Yoast SEO",
	website: "https://yoast.com/wordpress/plugins/seo/",
	description: "Yoast SEO is a search engine optimisation plugin for WordPress and other platforms.",
	icon: "Yoast SEO.png",
	categories: [
		"marketing-automation",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "yoast-seo:html:0",
			kind: "html",
			pattern: new RegExp("<!-- This site is optimized with the Yoast (?:WordPress )?SEO plugin v([^\\s]+) -"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yoast-seo:html:1",
			kind: "html",
			pattern: new RegExp("<!-- This site is optimized with the Yoast SEO Premium plugin v(?:[^\\s]+) \\(Yoast SEO v([^\\s]+)\\) -"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yoast-seo:dom:2",
			kind: "dom",
			selector: "script.yoast-schema-graph",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoast-seo:dom:3",
			kind: "dom",
			selector: "script[class*='yoast-schema-graph']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoast-seo:html:4",
			kind: "html",
			pattern: new RegExp("<!-- this site is optimized with the yoast (?:wordpress )?seo plugin v([^\\s]+) -"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yoast-seo:html:5",
			kind: "html",
			pattern: new RegExp("<!-- this site is optimized with the yoast seo premium plugin v(?:[^\\s]+) \\(yoast seo v([^\\s]+)\\) -"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
