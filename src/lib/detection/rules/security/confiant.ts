import type { TechnologyDefinition } from '../../types';

export const confiantTechnologyDefinition = {
	id: "confiant",
	name: "Confiant",
	website: "https://www.confiant.com",
	description: "Confiant is a cybersecurity company specialising in ad security and ad quality assurance for digital publishers, programmatic platforms, and advertisers.",
	icon: "Confiant.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "confiant:jsGlobal:0",
			kind: "jsGlobal",
			property: "confiant",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
