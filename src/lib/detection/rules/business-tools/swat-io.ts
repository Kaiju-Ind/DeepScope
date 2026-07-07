import type { TechnologyDefinition } from '../../types';

export const swatIoTechnologyDefinition = {
	id: "swat-io",
	name: "Swat.io",
	website: "https://swat.io",
	description: "Swat.io is a platform offering social media management solutions for teams.",
	icon: "Swat.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "swat-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.swat\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
