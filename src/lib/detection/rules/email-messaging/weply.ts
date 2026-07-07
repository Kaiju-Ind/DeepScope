import type { TechnologyDefinition } from '../../types';

export const weplyTechnologyDefinition = {
	id: "weply",
	name: "Weply",
	website: "https://weply.chat",
	description: "Weply is a Nordic lead generation chat system designed to enhance lead generation from existing website traffic.",
	icon: "Weply.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "weply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.weply\\.chat\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "weply:jsGlobal:1",
			kind: "jsGlobal",
			property: "$$weply",
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
