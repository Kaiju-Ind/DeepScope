import type { TechnologyDefinition } from '../../types';

export const cloudimageTechnologyDefinition = {
	id: "cloudimage",
	name: "Cloudimage",
	website: "https://www.cloudimage.io",
	description: "Cloudimage automates the transformation and optimisation of images on the fly and accelerates their distribution via the Content Delivery Network (CDN).",
	icon: "Cloudimage.svg",
	categories: [
		"infrastructure-hosting",
		"media-video",
	],
	rules: [
		{
			id: "cloudimage:dom:0",
			kind: "dom",
			selector: "img[src*='.cloudimg.io/'], link[href*='.cloudimg.io/'], amp-img[src*='.cloudimg.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cloudimage:jsGlobal:1",
			kind: "jsGlobal",
			property: "ciResponsive.config.domain",
			valuePattern: new RegExp("cloudimg\\.io"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
