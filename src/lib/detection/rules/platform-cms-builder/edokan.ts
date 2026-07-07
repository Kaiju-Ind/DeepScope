import type { TechnologyDefinition } from '../../types';

export const edokanTechnologyDefinition = {
	id: "edokan",
	name: "eDokan",
	website: "https://edokan.co",
	description: "eDokan is hosted ecommerce platform with drag-drop template builder and zero programming knowledge.",
	icon: "eDokan.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "edokan:dom:0",
			kind: "dom",
			selector: "img[src*='cdn.edokan.co']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"angular",
		"mongodb",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
