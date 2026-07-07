import type { TechnologyDefinition } from '../../types';

export const textInChurchTechnologyDefinition = {
	id: "text-in-church",
	name: "Text In Church",
	website: "https://textinchurch.com",
	description: "Text In Church is a communication platform that enables churches to send text messages and manage member interactions.",
	icon: "TextInChurch.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "text-in-church:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.textinchurch\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
