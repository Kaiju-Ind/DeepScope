import type { TechnologyDefinition } from '../../types';

export const userwayTechnologyDefinition = {
	id: "userway",
	name: "UserWay",
	website: "https://userway.org/",
	description: "UserWay is a web accessibility overlay for websites that claims to improve compliance with accessibility standards.",
	icon: "UserWay.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "userway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.userway\\.org\\/widget.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
