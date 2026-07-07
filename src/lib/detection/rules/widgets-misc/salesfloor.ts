import type { TechnologyDefinition } from '../../types';

export const salesfloorTechnologyDefinition = {
	id: "salesfloor",
	name: "Salesfloor",
	website: "https://salesfloor.net",
	description: "Salesfloor is a mobile clienteling and virtual selling platform designed for store associates to connect with customers-beyond the store and a mpos platform for frictionless in-store experiences.",
	icon: "salesfloor.png",
	categories: [
		"widgets-misc",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "salesfloor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.salesfloor\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesfloor:dom:1",
			kind: "dom",
			selector: "iframe[src*='.salesfloor.net'], div[data-siterefer='salesfloor']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesfloor:jsGlobal:2",
			kind: "jsGlobal",
			property: "NMConfig.SALESFLOOR_ENV",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesfloor:jsGlobal:3",
			kind: "jsGlobal",
			property: "salesFloorHost",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
