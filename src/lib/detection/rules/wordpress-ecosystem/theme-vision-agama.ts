import type { TechnologyDefinition } from '../../types';

export const themeVisionAgamaTechnologyDefinition = {
	id: "theme-vision-agama",
	name: "Theme Vision Agama",
	website: "https://theme-vision.com/agama",
	description: "Agama is a free multi-purpose WordPress theme by Theme Vision.",
	icon: "Theme Vision.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-vision-agama:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/agama(?:-pro)?\\/.+functions\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme-vision-agama:jsGlobal:1",
			kind: "jsGlobal",
			property: "agama",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "theme-vision-agama:jsGlobal:2",
			kind: "jsGlobal",
			property: "agama_pro",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
