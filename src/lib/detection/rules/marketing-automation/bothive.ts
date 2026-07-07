import type { TechnologyDefinition } from '../../types';

export const bothiveTechnologyDefinition = {
	id: "bothive",
	name: "Bothive",
	website: "https://bothive.be",
	description: "Bothive is a platform that automates repetitive tasks, enhances collaboration, reduces email reliance, and improves customer relationships by prioritizing meaningful interactions.",
	icon: "Bothive.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bothive:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bothive.widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
