import type { TechnologyDefinition } from '../../types';

export const spiralcmsTechnologyDefinition = {
	id: "spiralcms",
	name: "SpiralCMS",
	website: "https://spiralcms.com",
	description: "SpiralCMS is a SEO-friendly headless content management system designed for modern web development workflows.",
	icon: "SpiralCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spiralcms:meta:0",
			kind: "meta",
			key: "x-powered-cms",
			valuePattern: new RegExp("^SpiralCMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "spiralcms:meta:1",
			kind: "meta",
			key: "x-powered-cms",
			valuePattern: new RegExp("^spiralcms$", "i"),
			description: "Meta tag matches a known technology marker.",
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
