import type { TechnologyDefinition } from '../../types';

export const yooriTechnologyDefinition = {
	id: "yoori",
	name: "Yoori",
	website: "https://spagreen.net/yoori-ecommerce-solution",
	description: "Yoori is a multi-vendor PWA ecommerce CMS.",
	icon: "Yoori.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yoori:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("console\\.log\\(\\'Yoori-Ecommerce"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "yoori:dom:1",
			kind: "dom",
			selector: "div.yoori--cookies",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoori:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("console\\.log\\(\\'yoori-ecommerce"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	implies: [
		"cpanel",
		"laravel",
		"mysql",
		"php",
		"pwa",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
