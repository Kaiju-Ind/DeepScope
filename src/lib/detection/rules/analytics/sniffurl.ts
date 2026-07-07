import type { TechnologyDefinition } from '../../types';

export const sniffurlTechnologyDefinition = {
	id: "sniffurl",
	name: "SniffURL",
	website: "https://sniffurl.com",
	description: "SniffURL is a visitor analytics platform that tracks and analyses user interactions to improve engagement and retention across websites.",
	icon: "SniffURL.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sniffurl:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sniffurl\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sniffurl:jsGlobal:1",
			kind: "jsGlobal",
			property: "SniffUrl.identify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
