import type { TechnologyDefinition } from '../../types';

export const chimpifyTechnologyDefinition = {
	id: "chimpify",
	name: "Chimpify",
	website: "https://www.chimpify.de",
	description: "Chimpify is an inbound marketing platform that consolidates content management, lead generation, and campaign tracking to support data-driven audience engagement.",
	icon: "Chimpify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "chimpify:jsGlobal:0",
			kind: "jsGlobal",
			property: "Chimpify.content_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chimpify:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Chimpify$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "chimpify:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^chimpify$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
