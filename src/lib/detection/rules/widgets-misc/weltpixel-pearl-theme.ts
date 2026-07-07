import type { TechnologyDefinition } from '../../types';

export const weltpixelPearlThemeTechnologyDefinition = {
	id: "weltpixel-pearl-theme",
	name: "WeltPixel Pearl Theme",
	website: "https://www.weltpixel.com/magento-2-theme-pearl",
	description: "Pearl Theme for Magento 2 by WeltPixel. Pearl Theme is following the Magento architecture, layouts and best practice in order to assure highest compatibility with 3rd party extensions.",
	icon: "WeltPixel.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "weltpixel-pearl-theme:dom:0",
			kind: "dom",
			selector: "body.theme-pearl",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "weltpixel-pearl-theme:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pearl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"onetime",
		],
	},
	implies: [
		"magento-version-2",
	],
} as const satisfies TechnologyDefinition;
