import type { TechnologyDefinition } from '../../types';

export const zanoxTechnologyDefinition = {
	id: "zanox",
	name: "Zanox",
	website: "https://zanox.com",
	icon: "Zanox.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "zanox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zanox\\.com\\/scripts\\/zanox\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zanox:html:1",
			kind: "html",
			pattern: new RegExp("<img [^>]*src=\"[^\"]+ad\\.zanox\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zanox:jsGlobal:2",
			kind: "jsGlobal",
			property: "zanox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
