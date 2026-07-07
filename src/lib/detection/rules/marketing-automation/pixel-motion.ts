import type { TechnologyDefinition } from '../../types';

export const pixelMotionTechnologyDefinition = {
	id: "pixel-motion",
	name: "Pixel Motion",
	website: "https://www.pixelmotion.com",
	description: "Pixel Motion is a provider of automotive digital marketing solutions.",
	icon: "PixelMotion.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pixel-motion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/pm-motors-plugin\\/modules\\/datalayer\\/\\/js\\/pixelmotion\\.js\\?ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pixel-motion:dom:1",
			kind: "dom",
			selector: "script#pixelmotion-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pixel-motion:jsGlobal:2",
			kind: "jsGlobal",
			property: "pm_api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixel-motion:jsGlobal:3",
			kind: "jsGlobal",
			property: "pm_datalayer_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixel-motion:jsGlobal:4",
			kind: "jsGlobal",
			property: "pm_datalayer_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixel-motion:jsGlobal:5",
			kind: "jsGlobal",
			property: "pm_datalayer_props",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
