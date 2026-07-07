import type { TechnologyDefinition } from '../../types';

export const imageengineTechnologyDefinition = {
	id: "imageengine",
	name: "ImageEngine",
	website: "https://imageengine.io",
	description: "ImageEngine is an intelligent image content delivery network. ImageEngine will resize your image content tailored to the end users device.",
	icon: "ImageEngine.svg",
	categories: [
		"infrastructure-hosting",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "imageengine:dom:0",
			kind: "dom",
			selector: "link[href*='.imgeng.in/'], img[src*='.imgeng.in/'], img[data-src*='.imgeng.in/'], source[srcset*='.imgeng.in/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
