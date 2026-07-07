import type { TechnologyDefinition } from '../../types';

export const trboTechnologyDefinition = {
	id: "trbo",
	name: "Trbo",
	website: "https://www.trbo.com",
	description: "Trbo is a personalisation, recommendations, A/B testing platform from Germany.",
	icon: "Trbo.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "trbo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trbo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trbo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_trbo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trbo:jsGlobal:2",
			kind: "jsGlobal",
			property: "_trbo_start",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trbo:jsGlobal:3",
			kind: "jsGlobal",
			property: "_trboq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trbo:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^trbo_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "trbo:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^trbo_usr$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
