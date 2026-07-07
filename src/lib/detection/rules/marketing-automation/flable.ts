import type { TechnologyDefinition } from '../../types';

export const flableTechnologyDefinition = {
	id: "flable",
	name: "Flable",
	website: "https://flable.ai",
	description: "Flable is an AI-powered digital marketing platform that unifies marketing data and reduces customer acquisition costs.",
	icon: "Flable.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "flable:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.flable\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "flable:jsGlobal:1",
			kind: "jsGlobal",
			property: "flable",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
