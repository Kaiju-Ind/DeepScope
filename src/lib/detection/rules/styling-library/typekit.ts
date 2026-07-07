import type { TechnologyDefinition } from '../../types';

export const typekitTechnologyDefinition = {
	id: "typekit",
	name: "Typekit",
	website: "https://typekit.com",
	description: "Typekit is an online service which offers a subscription library of fonts.",
	icon: "Typekit.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "typekit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("use\\.typekit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "typekit:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^\"]+use\\.typekit\\.(?:net|com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "typekit:jsGlobal:2",
			kind: "jsGlobal",
			property: "Typekit.config.js",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
