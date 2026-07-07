import type { TechnologyDefinition } from '../../types';

export const moyklassTechnologyDefinition = {
	id: "moyklass",
	name: "Moyklass",
	website: "https://moyklass.com",
	description: "Moyklass is a Russian customer relationship management platform designed to help schools manage student data, track performance, and organize administrative tasks.",
	icon: "Moyklass.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "moyklass:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.moyklass\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
