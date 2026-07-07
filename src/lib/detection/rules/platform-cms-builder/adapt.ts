import type { TechnologyDefinition } from '../../types';

export const adaptTechnologyDefinition = {
	id: "adapt",
	name: "ADAPT",
	website: "https://adapt.ws",
	description: "ADAPT is a subscription-based app that allows anyone to create video focused online store in minutes on their phone.",
	icon: "ADAPT.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adapt:meta:0",
			kind: "meta",
			key: "image",
			valuePattern: new RegExp("assets\\.adapt\\.ws\\/", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
