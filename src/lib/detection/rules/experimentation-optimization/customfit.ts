import type { TechnologyDefinition } from '../../types';

export const customfitTechnologyDefinition = {
	id: "customfit",
	name: "CustomFit",
	website: "https://www.customfit.ai",
	description: "CustomFit is a no-code website personalization platform that enables marketers to increase conversions by customizing content for specific audience segments.",
	icon: "CustomFit.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "customfit:jsGlobal:0",
			kind: "jsGlobal",
			property: "CustomFit.CFEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
