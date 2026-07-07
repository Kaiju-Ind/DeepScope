import type { TechnologyDefinition } from '../../types';

export const bananaSplashTechnologyDefinition = {
	id: "banana-splash",
	name: "Banana Splash",
	website: "https://www.banana-splash.com",
	description: "Banana Splash is a mobile lead generation system designed to help businesses attract and capture potential customer information.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "banana-splash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.banana-splash\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "banana-splash:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("my\\.banana-splash\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
