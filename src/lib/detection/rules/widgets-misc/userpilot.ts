import type { TechnologyDefinition } from '../../types';

export const userpilotTechnologyDefinition = {
	id: "userpilot",
	name: "Userpilot",
	website: "https://userpilot.com",
	description: "Userpilot is a cloud-based product experience platform designed for customer success and product teams to onboard users and increase product adoption through behavior-triggered experiences.",
	icon: "Userpilot.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "userpilot:jsGlobal:0",
			kind: "jsGlobal",
			property: "userpilot.triggerById",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userpilot:jsGlobal:1",
			kind: "jsGlobal",
			property: "userpilotInitiatorSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userpilot:jsGlobal:2",
			kind: "jsGlobal",
			property: "userpilotPako",
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
