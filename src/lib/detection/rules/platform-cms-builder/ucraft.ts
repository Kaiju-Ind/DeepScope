import type { TechnologyDefinition } from '../../types';

export const ucraftTechnologyDefinition = {
	id: "ucraft",
	name: "Ucraft",
	website: "https://www.ucraft.com",
	description: "Ucraft is a website building platform that enables the creation of websites or online stores.",
	icon: "Ucraft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ucraft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.ucraft\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ucraft:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Ucraft$", "i"),
			description: "Meta tag matches a known technology marker.",
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
