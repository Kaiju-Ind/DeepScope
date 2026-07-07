import type { TechnologyDefinition } from '../../types';

export const actitoTechnologyDefinition = {
	id: "actito",
	name: "Actito",
	website: "https://www.actito.com",
	description: "Actito is an agile SaaS marketing automation platform.",
	icon: "Actito.png",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "actito:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.actito\\.be"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "actito:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.advisor\\.smartfocus\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "actito:jsGlobal:2",
			kind: "jsGlobal",
			property: "_actGoal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "actito:jsGlobal:3",
			kind: "jsGlobal",
			property: "smartFocus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "actito:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^SmartFocus$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "actito:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^smartfocus$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
