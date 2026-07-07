import type { TechnologyDefinition } from '../../types';

export const perfectStormTechnologyDefinition = {
	id: "perfect-storm",
	name: "Perfect Storm",
	website: "https://www.perfectstormnow.com",
	description: "Perfect Storm is an all-in-one platform for real estate lead generation and customer relationship management, designed to support business scaling.",
	icon: "PerfectStorm.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "perfect-storm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.perfectstormnow\\.com"),
			description: "Script content contains a bounded technology signature.",
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
