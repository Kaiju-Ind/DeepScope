import type { TechnologyDefinition } from '../../types';

export const clutchTechnologyDefinition = {
	id: "clutch",
	name: "Clutch",
	website: "https://clutch.co/content/add-review-widget-your-website",
	description: "Clutch review widgets are stand-alone applications that you can embed on your website to show your dynamic ratings and reviews.",
	icon: "clutch.svg",
	categories: [
		"community-ugc",
		"widgets-misc",
	],
	rules: [
		{
			id: "clutch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/widget\\.clutch\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
