import type { TechnologyDefinition } from '../../types';

export const flipTechnologyDefinition = {
	id: "flip",
	name: "Flip",
	website: "https://www.getflip.com",
	description: "Flip is an employee app combining top features from popular social media platforms. It enables communication between deskless workers and those with corporate devices, offering chat, newsfeed, shift planning, timesheets, and more.",
	icon: "Flip.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "flip:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^flip_sentry_dsn$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "flip:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^Flip$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "flip:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^flip$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
