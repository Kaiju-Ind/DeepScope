import type { TechnologyDefinition } from '../../types';

export const signalzenTechnologyDefinition = {
	id: "signalzen",
	name: "SignalZen",
	website: "https://www.signalzen.com",
	description: "SignalZen is a customer support platform that enables teams to manage AI-powered conversations directly from Slack or Microsoft Teams.",
	icon: "SignalZen.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "signalzen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.signalzen\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "signalzen:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.signalzen\\.com"),
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
