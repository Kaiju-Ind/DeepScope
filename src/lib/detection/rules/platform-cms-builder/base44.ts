import type { TechnologyDefinition } from '../../types';

export const base44TechnologyDefinition = {
	id: "base44",
	name: "Base44",
	website: "https://base44.com/",
	description: "Base44 is an AI-powered, no-code platform that lets users build functional web apps from natural language prompts instead of writing code.",
	icon: "Base44.png",
	categories: [
		"platform-cms-builder",
		"framework",
	],
	rules: [
		{
			id: "base44:meta:0",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("base44", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "base44:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("Base44", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "base44:dom:2",
			kind: "dom",
			selector: "link[href*='supabase.co/storage/v1/object/public/base44-prod/public/'], meta[property='og:image'][content*='supabase.co/storage/v1/render/image/public/base44-prod/public/']",
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
