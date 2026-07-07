import type { TechnologyDefinition } from '../../types';

export const technology220marketingTechnologyDefinition = {
	id: "220marketing",
	name: "220Marketing",
	website: "https://www.220marketing.com",
	description: "220Marketing is a marketing service that provides solutions for the mortgage, insurance, real estate, and solar industries.",
	icon: "220Marketing.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "220marketing:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.my220\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
