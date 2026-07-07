import type { TechnologyDefinition } from '../../types';

export const classcreatorTechnologyDefinition = {
	id: "classcreator",
	name: "ClassCreator",
	website: "https://www.classcreator.com",
	description: "ClassCreator is a school class reunion planning tool that helps organize events, manage guest lists, and track RSVPs, streamlining the coordination of reunions.",
	icon: "ClassCreator.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "classcreator:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.classcreator\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
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
