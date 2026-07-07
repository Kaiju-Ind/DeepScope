import type { TechnologyDefinition } from '../../types';

export const knockKnockAppTechnologyDefinition = {
	id: "knock-knock-app",
	name: "Knock Knock App",
	website: "https://knockknockapp.ai",
	description: "Knock Knock App is a video call solution for instant communication with website visitors, designed to optimize inbound inquiries and increase sales from website and landing page traffic.",
	icon: "KnockKnockApp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "knock-knock-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.knock-knockapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "knock-knock-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "Knock_knock_user",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "knock-knock-app:jsGlobal:2",
			kind: "jsGlobal",
			property: "knock_widget_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
