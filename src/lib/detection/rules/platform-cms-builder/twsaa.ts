import type { TechnologyDefinition } from '../../types';

export const twsaaTechnologyDefinition = {
	id: "twsaa",
	name: "Twsaa",
	website: "https://twsaa.com",
	description: "Twsaa is a commerce platform designed to support business transactions and customer interactions within the Saudi Arabian market.",
	icon: "Twsaa.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "twsaa:jsGlobal:0",
			kind: "jsGlobal",
			property: "twsaa.app",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "twsaa:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^twsaa_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
