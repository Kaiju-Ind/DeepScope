import type { TechnologyDefinition } from '../../types';

export const jekyllTechnologyDefinition = {
	id: "jekyll",
	name: "Jekyll",
	website: "https://jekyllrb.com",
	description: "Jekyll is a blog-aware, static site generator for personal, project, or organisation sites.",
	icon: "Jekyll.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "jekyll:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"https?:\\/\\/jekyllrb\\.com\"[^>]*>Jekyll<\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:html:1",
			kind: "html",
			pattern: new RegExp("<!-- Created with Jekyll Now -"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:html:2",
			kind: "html",
			pattern: new RegExp("<!-- Begin Jekyll SEO tag"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Jekyll\\sv([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jekyll:jsGlobal:4",
			kind: "jsGlobal",
			property: "SimpleJekyllSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jekyll:html:5",
			kind: "html",
			pattern: new RegExp("<!-- begin jekyll seo tag"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:html:6",
			kind: "html",
			pattern: new RegExp("<!-- created with jekyll now -"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:html:7",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"https?:\\/\\/jekyllrb\\.com\"[^>]*>jekyll<\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jekyll:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("jekyll\\sv([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jekyllrb:jekyll:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
