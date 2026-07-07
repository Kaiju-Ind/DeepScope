import type { TechnologyDefinition } from '../../types';

export const converzeeTechnologyDefinition = {
	id: "converzee",
	name: "Converzee",
	website: "https://converzee.com",
	description: "Converzee is a digital platform created to help companies manage their human resource processes.",
	icon: "Converzee.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "converzee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.converzee\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
