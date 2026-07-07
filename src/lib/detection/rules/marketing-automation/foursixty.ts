import type { TechnologyDefinition } from '../../types';

export const foursixtyTechnologyDefinition = {
	id: "foursixty",
	name: "Foursixty",
	website: "https://foursixty.com/",
	description: "Foursixty is a widget which turns Instagram content and user-generated content into shoppable galleries.",
	icon: "Foursixty.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "foursixty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("foursixty\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "foursixty:jsGlobal:1",
			kind: "jsGlobal",
			property: "FoursixtyEmbed",
			description: "Page-owned global matches a known technology marker.",
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
