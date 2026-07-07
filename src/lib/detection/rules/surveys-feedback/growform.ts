import type { TechnologyDefinition } from '../../types';

export const growformTechnologyDefinition = {
	id: "growform",
	name: "Growform",
	website: "https://www.growform.co",
	description: "Growform is a multi-step form builder that includes email alerts, Zapier integrations, and built-in templates.",
	icon: "Growform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "growform:jsGlobal:0",
			kind: "jsGlobal",
			property: "embedGrowform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "growform:jsGlobal:1",
			kind: "jsGlobal",
			property: "growform.setHiddenField",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
