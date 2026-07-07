import type { TechnologyDefinition } from '../../types';

export const w3TotalCacheTechnologyDefinition = {
	id: "w3-total-cache",
	name: "W3 Total Cache",
	website: "https://www.w3-edge.com/wordpress-plugins/w3-total-cache",
	description: "W3 Total Cache (W3TC) improves the SEO and increases website performance and reducing load times by leveraging features like content delivery network (CDN) integration and the latest best practices.",
	icon: "W3 Total Cache.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "w3-total-cache:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+W3 Total Cache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "w3-total-cache:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("W3 Total Cache(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "w3-total-cache:html:2",
			kind: "html",
			pattern: new RegExp("<!--[^>]+w3 total cache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "w3-total-cache:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("w3 total cache(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
