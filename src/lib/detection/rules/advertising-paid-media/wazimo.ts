import type { TechnologyDefinition } from '../../types';

export const wazimoTechnologyDefinition = {
	id: "wazimo",
	name: "Wazimo",
	website: "https://wazimo.com",
	description: "Wazimo is a digital media company focused on combining engaging content with advanced real-time tendering (RTB) capabilities.",
	icon: "wazimo.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "wazimo:jsGlobal:0",
			kind: "jsGlobal",
			property: "wz.mmConfig.buildVersion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
