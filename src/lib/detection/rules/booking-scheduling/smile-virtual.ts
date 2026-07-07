import type { TechnologyDefinition } from '../../types';

export const smileVirtualTechnologyDefinition = {
	id: "smile-virtual",
	name: "Smile Virtual",
	website: "https://www.smilevirtual.com",
	description: "Smile Virtual is a platform that enables patients to consult with a dentist remotely to explore options for enhancing their smile from home.",
	icon: "SmileVirtual.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "smile-virtual:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.smilevirtual\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smile-virtual:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.smilevirtual\\.com"),
			description: "Script content contains a bounded technology signature.",
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
