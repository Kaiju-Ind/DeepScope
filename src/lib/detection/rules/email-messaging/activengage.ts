import type { TechnologyDefinition } from '../../types';

export const activengageTechnologyDefinition = {
	id: "activengage",
	name: "ActivEngage",
	website: "https://www.activengage.com",
	description: "ActivEngage is an automotive chat service that enables real-time website messaging between dealerships and customers.",
	icon: "ActivEngage.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "activengage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pageview\\.activengage\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "activengage:jsGlobal:1",
			kind: "jsGlobal",
			property: "ActivEngage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
