import type { TechnologyDefinition } from '../../types';

export const inblogTechnologyDefinition = {
	id: "inblog",
	name: "Inblog",
	website: "https://inblog.ai",
	description: "Inblog is a content management system designed for SEO, featuring CTAs and analytics for revenue optimization.",
	icon: "Inblog.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "inblog:dom:0",
			kind: "dom",
			selector: "link[href*='inblog.ai/_next/static']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "inblog:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("inblog", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"next-js",
		"shadcn-ui",
		"supabase",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
