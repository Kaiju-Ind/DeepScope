import type { TechnologyDefinition } from '../../types';

export const webxTechnologyDefinition = {
	id: "webx",
	name: "Webx",
	website: "https://www.webx.pk",
	description: "Webx is a hosted ecommerce solution from Pakistan.",
	icon: "Webx.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webx:dom:0",
			kind: "dom",
			selector: "div#divPowered > div > p > a[href*='.webx.pk']",
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
} as const satisfies TechnologyDefinition;
