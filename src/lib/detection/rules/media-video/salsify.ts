import type { TechnologyDefinition } from '../../types';

export const salsifyTechnologyDefinition = {
	id: "salsify",
	name: "Salsify",
	website: "https://www.salsify.com",
	description: "Salsify is a product experience management platform which connects digital asset management, content syndication, and digital catalog capabilities.",
	icon: "Salsify.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "salsify:dom:0",
			kind: "dom",
			selector: "a[href*='.salsify.com/'][target='_blank'], img[data-src*='images.salsify.com/'], link[href*='.salsify.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salsify:jsGlobal:1",
			kind: "jsGlobal",
			property: "salsify_vars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
