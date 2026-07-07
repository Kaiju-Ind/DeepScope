import type { TechnologyDefinition } from '../../types';

export const yonderTechnologyDefinition = {
	id: "yonder",
	name: "Yonder",
	website: "https://www.yonderhq.com",
	description: "Yonder is a booking automation solution that helps tourism businesses increase bookings, collect feedback, garner positive reviews, convert website visitors, automate FAQs with an AI chatbot, and communicate with customers.",
	icon: "Yonder.svg",
	categories: [
		"email-messaging",
		"booking-scheduling",
	],
	rules: [
		{
			id: "yonder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.yonderhq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yonder:jsGlobal:1",
			kind: "jsGlobal",
			property: "YONDER_APP_LOADED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yonder:jsGlobal:2",
			kind: "jsGlobal",
			property: "toggleYonderChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
