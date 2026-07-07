import type { TechnologyDefinition } from '../../types';

export const transloaditTechnologyDefinition = {
	id: "transloadit",
	name: "Transloadit",
	website: "https://transloadit.com",
	description: "Transloadit is a service for file uploading, conversion, and processing across various formats.",
	icon: "Transloadit.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "transloadit:dom:0",
			kind: "dom",
			selector: "link[href*='transloadit.edgly.net/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:transloadit:uppy:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
