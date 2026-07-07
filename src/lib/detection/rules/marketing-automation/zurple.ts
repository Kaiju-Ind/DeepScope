import type { TechnologyDefinition } from '../../types';

export const zurpleTechnologyDefinition = {
	id: "zurple",
	name: "Zurple",
	website: "https://zurple.com",
	description: "Zurple is a real estate marketing software that provides a solution for agents to manage leads, automate follow-ups, and optimize client engagement.",
	icon: "Zurple.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zurple:jsGlobal:0",
			kind: "jsGlobal",
			property: "Zurple.Client",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
