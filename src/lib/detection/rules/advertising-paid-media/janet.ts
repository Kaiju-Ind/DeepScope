import type { TechnologyDefinition } from '../../types';

export const janetTechnologyDefinition = {
	id: "janet",
	name: "JANet",
	website: "https://j-a-net.jp",
	description: "JANet is an affiliate marketing network.",
	icon: "JANet.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "janet:dom:0",
			kind: "dom",
			selector: "img[src*='.j-a-net.jp'],img[data-src*='.j-a-net.jp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
