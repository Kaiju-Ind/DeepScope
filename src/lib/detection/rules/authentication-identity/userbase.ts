import type { TechnologyDefinition } from '../../types';

export const userbaseTechnologyDefinition = {
	id: "userbase",
	name: "Userbase",
	website: "https://userbase.com",
	description: "Userbase is a tool facilitating login integration and user data persistence for static websites.",
	icon: "Userbase.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "userbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "userbase",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
