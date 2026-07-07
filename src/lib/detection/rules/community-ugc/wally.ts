import type { TechnologyDefinition } from '../../types';

export const wallyTechnologyDefinition = {
	id: "wally",
	name: "Wally",
	website: "https://getwally.net",
	description: "Wally is a tool that imports, manages, and displays reviews from platforms like Google and Trustpilot on a website, providing social proof to enhance credibility.",
	icon: "Wally.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "wally:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.getwally\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wally:jsGlobal:1",
			kind: "jsGlobal",
			property: "wallyIsEventListenerAdded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
