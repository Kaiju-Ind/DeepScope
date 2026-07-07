import type { TechnologyDefinition } from '../../types';

export const quoraPixelTechnologyDefinition = {
	id: "quora-pixel",
	name: "Quora Pixel",
	website: "https://quoraadsupport.zendesk.com/hc/en-us/categories/115001573928-Pixels-Tracking",
	description: "Quora Pixel is a tool that is placed in your website code to track traffic and conversions.",
	icon: "Quora.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "quora-pixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quora\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quora-pixel:jsGlobal:1",
			kind: "jsGlobal",
			property: "qp.qp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
