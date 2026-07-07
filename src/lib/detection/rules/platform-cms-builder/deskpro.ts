import type { TechnologyDefinition } from '../../types';

export const deskproTechnologyDefinition = {
	id: "deskpro",
	name: "DeskPro",
	website: "https://www.deskpro.com",
	description: "DeskPro is multi channel helpdesk software for managing customer and citizen requests via email, forms, chat, social and voice.",
	icon: "DeskPro.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "deskpro:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^DeskPRO.+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "deskpro:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^deskpro.+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:deskpro:deskpro:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
