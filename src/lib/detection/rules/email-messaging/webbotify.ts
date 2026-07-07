import type { TechnologyDefinition } from '../../types';

export const webbotifyTechnologyDefinition = {
	id: "webbotify",
	name: "Webbotify",
	website: "https://www.webbotify.com",
	description: "Webbotify is a chatbot platform that uses AI trained specifically on a website's content to provide automated responses.",
	icon: "Webbotify.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "webbotify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.webbotify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
