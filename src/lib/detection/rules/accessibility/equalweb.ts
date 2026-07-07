import type { TechnologyDefinition } from '../../types';

export const equalwebTechnologyDefinition = {
	id: "equalweb",
	name: "EqualWeb",
	website: "https://www.equalweb.com/",
	description: "EqualWeb provides a web accessibility overlay, and helps some people with disabilities access digital information.",
	icon: "EqualWeb.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "equalweb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.equalweb\\.com.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
