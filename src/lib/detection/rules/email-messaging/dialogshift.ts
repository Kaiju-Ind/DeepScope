import type { TechnologyDefinition } from '../../types';

export const dialogshiftTechnologyDefinition = {
	id: "dialogshift",
	name: "DialogShift",
	website: "https://www.dialogshift.com",
	description: "DialogShift is a hotel AI solution for chat, email, and telephone communication.",
	icon: "DialogShift.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "dialogshift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.dialogshift\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dialogshift:jsGlobal:1",
			kind: "jsGlobal",
			property: "Dialogshift.instance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
