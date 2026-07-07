import type { TechnologyDefinition } from '../../types';

export const facilItiTechnologyDefinition = {
	id: "facil-iti",
	name: "Facil-iti",
	website: "https://www.facil-iti.com/",
	description: "Facil-iti is a web accessibility overlay which provides support for some people with disabilities and seniors.",
	icon: "Facil-iti.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "facil-iti:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ws\\.facil-iti\\.com\\/tag\\/faciliti-tag\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
