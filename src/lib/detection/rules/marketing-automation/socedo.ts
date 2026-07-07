import type { TechnologyDefinition } from '../../types';

export const socedoTechnologyDefinition = {
	id: "socedo",
	name: "Socedo",
	website: "https://socedoagency.com",
	description: "Socedo is a B2B demand generation system designed for social media, helping businesses identify, engage, and convert potential leads through targeted social interactions and automated workflows.",
	icon: "Socedo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "socedo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.socedo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "socedo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_socedo.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
