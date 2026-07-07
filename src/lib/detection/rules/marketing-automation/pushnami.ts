import type { TechnologyDefinition } from '../../types';

export const pushnamiTechnologyDefinition = {
	id: "pushnami",
	name: "Pushnami",
	website: "https://pushnami.com",
	description: "Pushnami is an AI-powered messaging platform that uses intelligent analytics to deliver superior push, social, and email performance.",
	icon: "Pushnami.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushnami:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.pushnami\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
