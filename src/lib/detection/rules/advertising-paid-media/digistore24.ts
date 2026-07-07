import type { TechnologyDefinition } from '../../types';

export const digistore24TechnologyDefinition = {
	id: "digistore24",
	name: "Digistore24",
	website: "https://www.digistore24.com",
	description: "Digistore24 is a German digital reselling and affiliate marketing platform.",
	icon: "Digistore24.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "digistore24:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("digistore\\/digistore\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "digistore24:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.digistore24\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "digistore24:dom:2",
			kind: "dom",
			selector: "a[href*='www.digistore24.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "digistore24:jsGlobal:3",
			kind: "jsGlobal",
			property: "DIGISTORE_LINK_ID_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "digistore24:jsGlobal:4",
			kind: "jsGlobal",
			property: "DIGISTORE_VENDORKEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "digistore24:jsGlobal:5",
			kind: "jsGlobal",
			property: "getTheSourceForDigistoreLinks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
