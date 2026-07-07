import type { TechnologyDefinition } from '../../types';

export const byscuitTechnologyDefinition = {
	id: "byscuit",
	name: "Byscuit",
	website: "https://www.byscuit.com",
	description: "Byscuit is a tool for managing cookies on websites, allowing users to control and customise their cookie preferences for enhanced privacy and browsing experience.",
	icon: "Byscuit.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "byscuit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.byscuit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "byscuit:jsGlobal:1",
			kind: "jsGlobal",
			property: "onloadByscuit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
