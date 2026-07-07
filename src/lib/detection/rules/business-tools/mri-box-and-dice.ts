import type { TechnologyDefinition } from '../../types';

export const mriBoxAndDiceTechnologyDefinition = {
	id: "mri-box-and-dice",
	name: "MRI Box and Dice",
	website: "https://www.mrisoftware.com/au/products/box-and-dice/",
	description: "MRI Box and Dice is a CRM platform designed for real estate agencies, providing tools for managing client relationships, property listings, and transactions.",
	icon: "MRISoftware.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mri-box-and-dice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.boxdice\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
