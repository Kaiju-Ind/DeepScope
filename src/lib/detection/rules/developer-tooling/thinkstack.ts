import type { TechnologyDefinition } from '../../types';

export const thinkstackTechnologyDefinition = {
	id: "thinkstack",
	name: "Thinkstack",
	website: "https://www.thinkstack.ai",
	description: "Thinkstack is a platform that develops custom AI chatbots tailored to specific business requirements.",
	icon: "Thinkstack.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "thinkstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.thinkstack\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
