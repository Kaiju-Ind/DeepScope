import type { TechnologyDefinition } from '../../types';

export const imgixTechnologyDefinition = {
	id: "imgix",
	name: "Imgix",
	website: "https://imgix.com/",
	description: "Imgix is a visual media platform for managing, processing, rendering, optimising and delivering your existing images.",
	icon: "Imgix.svg",
	categories: [
		"infrastructure-hosting",
		"media-video",
	],
	rules: [
		{
			id: "imgix:dom:0",
			kind: "dom",
			selector: "img[src*='.imgix.net/'], img[data-src*='.imgix.net/'], img[srcset*='.imgix.net/'], source[src*='.imgix.net/'], source[data-src*='.imgix.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "imgix:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.imgix\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:imgix:imgix:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
