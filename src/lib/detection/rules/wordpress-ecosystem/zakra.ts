import type { TechnologyDefinition } from '../../types';

export const zakraTechnologyDefinition = {
	id: "zakra",
	name: "Zakra",
	website: "https://zakratheme.com",
	description: "Zakra is flexible, fast, lightweight and modern multipurpose WordPress theme that comes with many starter free sites.",
	icon: "Zakra.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "zakra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/zakra\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zakra:dom:1",
			kind: "dom",
			selector: "link#zakra-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zakra:jsGlobal:2",
			kind: "jsGlobal",
			property: "zakraFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zakra:jsGlobal:3",
			kind: "jsGlobal",
			property: "zakraNavHelper.dimension",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
