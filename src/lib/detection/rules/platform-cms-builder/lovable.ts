import type { TechnologyDefinition } from '../../types';

export const lovableTechnologyDefinition = {
	id: "lovable",
	name: "Lovable",
	website: "https://lovable.dev",
	description: "Lovable is an AI-powered, no-code platform that lets users build functional web apps from natural language prompts instead of writing code.",
	icon: "Lovable.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lovable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lovable\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lovable:dom:1",
			kind: "dom",
			selector: "link[href*='/lovable-uploads/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lovable:jsGlobal:2",
			kind: "jsGlobal",
			property: "LOV_SELECTOR_SCRIPT_VERSION",
			valuePattern: new RegExp("^[\\d\\.]+$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lovable:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^lovable\\-preview\\-mode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "lovable:meta:4",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("lovable", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lovable:meta:5",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Lovable", "i"),
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
} as const satisfies TechnologyDefinition;
