import type { TechnologyDefinition } from '../../types';

export const jonasClubSoftwareTechnologyDefinition = {
	id: "jonas-club-software",
	name: "Jonas Club Software",
	website: "https://jonasclub.com",
	description: "Jonas Club Software is a provider of club management solutions, facilitating relationship building with members, revenue growth, and cost reduction.",
	icon: "Jonas.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jonas-club-software:jsGlobal:0",
			kind: "jsGlobal",
			property: "jonasPrivacyPolicy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jonas-club-software:jsGlobal:1",
			kind: "jsGlobal",
			property: "jonasPrivacyPolicyClassName",
			description: "Page-owned global matches a known technology marker.",
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
