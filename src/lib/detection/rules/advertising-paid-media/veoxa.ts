import type { TechnologyDefinition } from '../../types';

export const veoxaTechnologyDefinition = {
	id: "veoxa",
	name: "Veoxa",
	website: "https://veoxa.com",
	icon: "Veoxa.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "veoxa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracking\\.veoxa\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "veoxa:html:1",
			kind: "html",
			pattern: new RegExp("<img [^>]*src=\"[^\"]+tracking\\.veoxa\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "veoxa:jsGlobal:2",
			kind: "jsGlobal",
			property: "VuVeoxaContent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
