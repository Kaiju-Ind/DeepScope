import type { TechnologyDefinition } from '../../types';

export const localsignalTechnologyDefinition = {
	id: "localsignal",
	name: "LocalSignal",
	website: "https://www.localsignal.com",
	description: "LocalSignal is a platform that provides advanced tools for managing and optimizing local marketing activities across digital channels.",
	icon: "LocalSignal.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "localsignal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.localsignal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
