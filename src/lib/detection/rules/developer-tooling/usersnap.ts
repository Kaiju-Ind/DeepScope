import type { TechnologyDefinition } from '../../types';

export const usersnapTechnologyDefinition = {
	id: "usersnap",
	name: "Usersnap",
	website: "https://usersnap.com",
	description: "Usersnap is a user feedback platform for product teams to collect issues, ideas, and surveys, aiding in user testing and product decisions.",
	icon: "Usersnap.svg",
	categories: [
		"developer-tooling",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "usersnap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.usersnap\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "usersnap:dom:1",
			kind: "dom",
			selector: "link[href*='.usersnap.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "usersnap:jsGlobal:2",
			kind: "jsGlobal",
			property: "onUsersnapCXLoad",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
