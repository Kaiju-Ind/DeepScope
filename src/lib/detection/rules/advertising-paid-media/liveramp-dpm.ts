import type { TechnologyDefinition } from '../../types';

export const liverampDpmTechnologyDefinition = {
	id: "liveramp-dpm",
	name: "LiveRamp DPM",
	website: "https://liveramp.com/data-plus-math",
	description: "LiveRamp DPM is a TV advertising metrics and analytics platform.",
	icon: "LiveRamp.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "liveramp-dpm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c\\.tvpixel\\.com\\/js\\/current\\/dpm_pixel_min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liveramp-dpm:jsGlobal:1",
			kind: "jsGlobal",
			property: "dpmComscoreVars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
