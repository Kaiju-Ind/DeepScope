import type { TechnologyDefinition } from '../../types';

export const muchatTechnologyDefinition = {
	id: "muchat",
	name: "Muchat",
	website: "https://mu.chat",
	description: "Muchat is a customer support tool that uses artificial intelligence to deliver personalized conversations by leveraging customer data.",
	icon: "Muchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "muchat:dom:0",
			kind: "dom",
			selector: "div[class^='muchat-chatbox'], style[data-emotion*='muchat-chatbox-bubble']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "muchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "Muchat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
