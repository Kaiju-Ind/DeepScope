import type { TechnologyDefinition } from '../../types';

export const shortpixelImageOptimizerTechnologyDefinition = {
	id: "shortpixel-image-optimizer",
	name: "ShortPixel Image Optimizer",
	website: "https://shortpixel.com",
	description: "ShortPixel Image Optimizer is a lightweight WordPress plugin that can compress all of your site's images and PDF documents.",
	icon: "ShortPixel.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "shortpixel-image-optimizer:jsGlobal:0",
			kind: "jsGlobal",
			property: "spPicTest",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
