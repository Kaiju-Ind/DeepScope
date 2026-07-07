import type { TechnologyDefinition } from '../../types';

export const wikinggruppenTechnologyDefinition = {
	id: "wikinggruppen",
	name: "Wikinggruppen",
	website: "https://wikinggruppen.se/",
	description: "Wikinggruppen is a Swedish company specializing in ecommerce solutions, offering custom platform development, CMS integration, and technical support.",
	icon: "wikinggruppen.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wikinggruppen:html:0",
			kind: "html",
			pattern: new RegExp("<!-- WIKINGGRUPPEN"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wikinggruppen:html:1",
			kind: "html",
			pattern: new RegExp("<!-- WIKINGGRUPPEN\\s([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wikinggruppen:html:2",
			kind: "html",
			pattern: new RegExp("<!-- wikinggruppen"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
