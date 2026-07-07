import type { TechnologyDefinition } from '../../types';

export const impervaTechnologyDefinition = {
	id: "imperva",
	name: "Imperva",
	website: "https://www.imperva.com/",
	description: "Imperva is a cyber security software and services company for networking, data, and application security.",
	icon: "Imperva.svg",
	categories: [
		"security",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "imperva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_Incapsula_Resource"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "imperva:header:1",
			kind: "header",
			key: "X-CDN",
			valuePattern: new RegExp("Incapsula", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "imperva:header:2",
			kind: "header",
			key: "x-cdn",
			valuePattern: new RegExp("^Imperva", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "imperva:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_incapsula_resource"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "imperva:header:4",
			kind: "header",
			key: "x-cdn",
			valuePattern: new RegExp("^imperva", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
