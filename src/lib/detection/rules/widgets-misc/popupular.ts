import type { TechnologyDefinition } from '../../types';

export const popupularTechnologyDefinition = {
	id: "popupular",
	name: "Popupular",
	website: "https://popupular.io",
	description: "Popupular is a platform that allows easy embedding of Mailchimp forms, YouTube videos, Calendly calendars, etc. into fully controllable popups on your site, with no coding required.",
	icon: "Popupular.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "popupular:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.popupular\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popupular:jsGlobal:1",
			kind: "jsGlobal",
			property: "Popupular",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
