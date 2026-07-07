import type { TechnologyDefinition } from '../../types';

export const githubPagesTechnologyDefinition = {
	id: "github-pages",
	name: "GitHub Pages",
	website: "https://pages.github.com/",
	description: "GitHub Pages is a static site hosting service.",
	icon: "GitHub.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "github-pages:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.github\\.io"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "github-pages:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^GitHub\\.com$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "github-pages:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^github\\.com$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
