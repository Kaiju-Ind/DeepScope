import type { TechnologyDefinition } from '../../types';

export const wuiltTechnologyDefinition = {
	id: "wuilt",
	name: "Wuilt",
	website: "https://wuilt.com",
	description: "Wuilt is the first Arab platform of its kind to help individuals and businesses create ready-made websites and ecommerce stores.",
	icon: "Wuilt.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wuilt:dom:0",
			kind: "dom",
			selector: "img[src*='wuilt-assets-v']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"node-js",
		"react",
	],
} as const satisfies TechnologyDefinition;
