import type { TechnologyDefinition } from '../../types';

export const kssibTechnologyDefinition = {
	id: "kssib",
	name: "Kssib",
	website: "https://kssib.com",
	description: "Kssib is a platform from Middle East that provides integrated ecommerce solutions.",
	icon: "Kssib.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kssib:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.kssib\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kssib:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^kssib_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
