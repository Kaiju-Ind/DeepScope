import type { TechnologyDefinition } from '../../types';

export const autopilotTechnologyDefinition = {
	id: "autopilot",
	name: "Autopilot",
	website: "https://www.autopilothq.com",
	description: "Autopilot is a visual marketing software that enables users to create marketing campaigns and manage lead conversions.",
	icon: "Autopilot.png",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
		"email-messaging",
	],
	rules: [
		{
			id: "autopilot:jsGlobal:0",
			kind: "jsGlobal",
			property: "Autopilot",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "autopilot:jsGlobal:1",
			kind: "jsGlobal",
			property: "AutopilotAnywhere",
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
