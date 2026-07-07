import type { TechnologyDefinition } from '../../types';

export const warmWelcomeTechnologyDefinition = {
	id: "warm-welcome",
	name: "Warm Welcome",
	website: "https://www.warmwelcome.com",
	description: "Warm Welcome is a tool that provides interactive video bubbles and video email features for personalized communication.",
	icon: "WarmWelcome.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "warm-welcome:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.warmwelcome\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
