import type { TechnologyDefinition } from '../../types';

export const googleMyBusinessTechnologyDefinition = {
	id: "google-my-business",
	name: "Google My Business",
	website: "https://www.google.com/business/website-builder",
	icon: "Google.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "google-my-business:url:0",
			kind: "url",
			pattern: new RegExp("https?:\\/\\/[^.]+\\.business\\.site"),
			description: "Page URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
