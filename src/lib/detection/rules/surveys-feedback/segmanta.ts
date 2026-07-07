import type { TechnologyDefinition } from '../../types';

export const segmantaTechnologyDefinition = {
	id: "segmanta",
	name: "Segmanta",
	website: "https://segmanta.com",
	description: "Segmanta is a mobile-first survey platform designed for product feedback, brand awareness and concept testing research.",
	icon: "Segmanta.png",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "segmanta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pge\\.segmanta\\.com\\/widget_embed_js(?:\\/widgetEmbed-v([\\d.]+)\\.min\\.js)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segmanta:jsGlobal:1",
			kind: "jsGlobal",
			property: "SEGMANTA__DYNAMIC_EMBED_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segmanta:jsGlobal:2",
			kind: "jsGlobal",
			property: "SEGMANTA__USER_METADATA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segmanta:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("pge\\.segmanta\\.com\\/widget_embed_js(?:\\/widgetembed-v([\\d.]+)\\.min\\.js)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
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
