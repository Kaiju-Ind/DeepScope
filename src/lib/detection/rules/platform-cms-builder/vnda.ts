import type { TechnologyDefinition } from '../../types';

export const vndaTechnologyDefinition = {
	id: "vnda",
	name: "Vnda",
	website: "https://www.vnda.com.br",
	description: "Vnda is an omnichannel ecommerce platform.",
	icon: "Vnda.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vnda:jsGlobal:0",
			kind: "jsGlobal",
			property: "Vnda.loadCartPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vnda:jsGlobal:1",
			kind: "jsGlobal",
			property: "vnda.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vnda:meta:2",
			kind: "meta",
			key: "image",
			valuePattern: new RegExp("cdn\\.vnda\\.com\\.br\\/", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"amazon-web-services",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
