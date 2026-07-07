import type { TechnologyDefinition } from '../../types';

export const wpSeoAiTechnologyDefinition = {
	id: "wp-seo-ai",
	name: "WP SEO AI",
	website: "https://wpseoai.com",
	description: "WP SEO AI is a tool that optimizes brand visibility by positioning companies as expert answers across search engines and AI platforms like Google and GPT.",
	icon: "WPSEOAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wp-seo-ai:dom:0",
			kind: "dom",
			selector: "script[id*='seoaic_front_main_js-js']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
