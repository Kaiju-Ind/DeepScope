import type { TechnologyDefinition } from '../../types';

export const c15tTechnologyDefinition = {
	id: "c15t",
	name: "c15t",
	website: "https://c15t.com",
	description: "c15t is an open source framework for managing cookies, consent, and privacy compliance.",
	icon: "c15t.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "c15t:jsGlobal:0",
			kind: "jsGlobal",
			property: "c15tStore.getInitialState",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
