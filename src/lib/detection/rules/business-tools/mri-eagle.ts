import type { TechnologyDefinition } from '../../types';

export const mriEagleTechnologyDefinition = {
	id: "mri-eagle",
	name: "MRI Eagle",
	website: "https://www.mrisoftware.com/au/products/eagle",
	description: "MRI Eagle is a technology solution catering to real estate firms, offering efficiency and cost-saving benefits.",
	icon: "MRISoftware.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mri-eagle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.eaglesoftware\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mri-eagle:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.eaglesoftware.com.au']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
