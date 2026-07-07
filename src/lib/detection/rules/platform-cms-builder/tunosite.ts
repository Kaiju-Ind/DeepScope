import type { TechnologyDefinition } from '../../types';

export const tunositeTechnologyDefinition = {
	id: "tunosite",
	name: "Tunosite",
	website: "https://tunosite.com",
	description: "Tunosite is a web app builder for startups and business with combining content, membership, and discussions in one place, under your own brand with no coding skills required.",
	icon: "Tunosite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tunosite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tunosite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tunosite:dom:1",
			kind: "dom",
			selector: "link[href*='app.tunosite.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
