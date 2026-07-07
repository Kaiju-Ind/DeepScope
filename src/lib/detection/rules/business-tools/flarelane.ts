import type { TechnologyDefinition } from '../../types';

export const flarelaneTechnologyDefinition = {
	id: "flarelane",
	name: "FlareLane",
	website: "https://www.flarelane.com",
	description: "FlareLane is a customer engagement platform that enables businesses to send personalized notifications through multiple channels such as mobile push, web push, SMS, email, and in-app messaging, with features for automation, A/B testing, and real-time analytics.",
	icon: "FlareLane.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "flarelane:jsGlobal:0",
			kind: "jsGlobal",
			property: "FlareLane",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flarelane:jsGlobal:1",
			kind: "jsGlobal",
			property: "flarelane_state",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
