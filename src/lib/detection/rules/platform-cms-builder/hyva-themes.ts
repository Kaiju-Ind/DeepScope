import type { TechnologyDefinition } from '../../types';

export const hyvaThemesTechnologyDefinition = {
	id: "hyva-themes",
	name: "Hyva Themes",
	website: "https://hyva.io",
	description: "Hyva Themes is a performance-optimised theme for Magento 2 which eliminated the third-party libraries and having only two dependencies Alpine.js and Tailwind CSS.",
	icon: "Hyva Themes.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hyva-themes:header:0",
			kind: "header",
			key: "X-Built-With",
			valuePattern: new RegExp("^Hyva Themes$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hyva-themes:jsGlobal:1",
			kind: "jsGlobal",
			property: "hyva",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hyva-themes:header:2",
			kind: "header",
			key: "x-built-with",
			valuePattern: new RegExp("^hyva themes$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	implies: [
		"alpine-js",
		"magento-version-2",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
