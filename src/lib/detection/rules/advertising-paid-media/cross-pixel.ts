import type { TechnologyDefinition } from '../../types';

export const crossPixelTechnologyDefinition = {
	id: "cross-pixel",
	name: "Cross Pixel",
	website: "https://crosspixel.net",
	description: "Cross Pixel is an advertising platform through which advertisers can leverage the marriage of partner audience synergies with the power of retargeting.",
	icon: "Cross Pixel.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "cross-pixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.crsspxl\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cross-pixel:jsGlobal:1",
			kind: "jsGlobal",
			property: "cp_C4w1ldN2d9PmVrkN",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
