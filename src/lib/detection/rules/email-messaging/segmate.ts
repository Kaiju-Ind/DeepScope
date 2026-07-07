import type { TechnologyDefinition } from '../../types';

export const segmateTechnologyDefinition = {
	id: "segmate",
	name: "SegMate",
	website: "https://segmateapp.com",
	description: "SegMate is a platform that allows businesses to create and manage Facebook Messenger bots for marketing and customer engagement.",
	icon: "SegMateApp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "segmate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.segmate\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
