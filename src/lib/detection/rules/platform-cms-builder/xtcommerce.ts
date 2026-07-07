import type { TechnologyDefinition } from '../../types';

export const xtcommerceTechnologyDefinition = {
	id: "xtcommerce",
	name: "xtCommerce",
	website: "https://www.xt-commerce.com",
	description: "xtCommerce is an ecommerce platform offering a complete solution for online shop management, including SEO, mobile optimization, and integrated payment systems.",
	icon: "xtCommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xtcommerce:html:0",
			kind: "html",
			pattern: new RegExp("<div class=\"copyright\">[^<]+<a[^>]+>xt:Commerce"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xtcommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("xt:Commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xtcommerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "XT.version.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xtcommerce:html:3",
			kind: "html",
			pattern: new RegExp("<div class=\"copyright\">[^<]+<a[^>]+>xt:commerce"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xtcommerce:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("xt:commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xt-commerce:xt-commerce:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
