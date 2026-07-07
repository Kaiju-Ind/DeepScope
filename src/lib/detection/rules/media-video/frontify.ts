import type { TechnologyDefinition } from '../../types';

export const frontifyTechnologyDefinition = {
	id: "frontify",
	name: "Frontify",
	website: "https://www.frontify.com",
	description: "Frontify is a cloud-based brand management platform for creators and collaborators of brands.",
	icon: "Frontify.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "frontify:dom:0",
			kind: "dom",
			selector: "a[href*='.frontify.com/'], img[src*='.frontify.com/'], link[href*='.frontify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "frontify:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^frontify$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
