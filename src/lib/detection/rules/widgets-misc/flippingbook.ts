import type { TechnologyDefinition } from '../../types';

export const flippingbookTechnologyDefinition = {
	id: "flippingbook",
	name: "FlippingBook",
	website: "https://flippingbook.com",
	description: "FlippingBook is a web-based software platform that enables users to create, publish, and share digital publications such as magazines, brochures, catalogs, and presentations.",
	icon: "FlippingBook.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "flippingbook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("online\\.flippingbook\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flippingbook:dom:1",
			kind: "dom",
			selector: "a[href*='flippingbook.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "flippingbook:jsGlobal:2",
			kind: "jsGlobal",
			property: "__flippingbook_csrf__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
