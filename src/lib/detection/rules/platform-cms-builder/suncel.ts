import type { TechnologyDefinition } from '../../types';

export const suncelTechnologyDefinition = {
	id: "suncel",
	name: "Suncel",
	website: "https://suncel.io",
	description: "Suncel is a powerful and versatile content platform with a simple visual builder for marketers and publishers.",
	icon: "Suncel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "suncel:dom:0",
			kind: "dom",
			selector: "img[srcset*='assets.suncel.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "suncel:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.suncel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
