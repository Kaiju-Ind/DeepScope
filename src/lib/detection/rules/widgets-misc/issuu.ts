import type { TechnologyDefinition } from '../../types';

export const issuuTechnologyDefinition = {
	id: "issuu",
	name: "Issuu",
	website: "https://issuu.com",
	description: "Issuu is a digital discovery and publishing platform.",
	icon: "Issuu.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "issuu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.issuu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "issuu:dom:1",
			kind: "dom",
			selector: "a[href*='issuu.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "issuu:jsGlobal:2",
			kind: "jsGlobal",
			property: "IssuuReaders",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "issuu:jsGlobal:3",
			kind: "jsGlobal",
			property: "issuuPanel",
			description: "Page-owned global matches a known technology marker.",
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
