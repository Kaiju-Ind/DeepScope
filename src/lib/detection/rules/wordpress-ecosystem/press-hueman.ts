import type { TechnologyDefinition } from '../../types';

export const pressHuemanTechnologyDefinition = {
	id: "press-hueman",
	name: "Press Hueman",
	website: "https://presscustomizr.com/hueman",
	description: "Press Hueman is a mobile friendly WordPress theme for blogs, magazines and business websites.",
	icon: "Press.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "press-hueman:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/hueman\\/.+scripts\\.min\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "press-hueman:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/hueman/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "press-hueman:jsGlobal:2",
			kind: "jsGlobal",
			property: "HUParams",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
