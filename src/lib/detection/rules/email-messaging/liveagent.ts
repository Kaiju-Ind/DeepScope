import type { TechnologyDefinition } from '../../types';

export const liveagentTechnologyDefinition = {
	id: "liveagent",
	name: "LiveAgent",
	website: "https://www.liveagent.com",
	description: "LiveAgent is an online live chat platform. The software provides a ticket management system.",
	icon: "LiveAgent.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "liveagent:jsGlobal:0",
			kind: "jsGlobal",
			property: "LiveAgent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
