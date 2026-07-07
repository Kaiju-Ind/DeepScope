import type { TechnologyDefinition } from '../../types';

export const userflowTechnologyDefinition = {
	id: "userflow",
	name: "Userflow",
	website: "https://userflow.com",
	description: "Userflow is a user onboarding software for building product tours and onboarding checklists, tailored to your app and your users.",
	icon: "Userflow.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "userflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.userflow\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userflow:jsGlobal:1",
			kind: "jsGlobal",
			property: "USERFLOWJS_QUEUE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userflow:jsGlobal:2",
			kind: "jsGlobal",
			property: "userflow.endAllFlows",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userflow:jsGlobal:3",
			kind: "jsGlobal",
			property: "userflow.endChecklist",
			confidence: 50,
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
