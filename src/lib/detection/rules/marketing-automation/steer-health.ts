import type { TechnologyDefinition } from '../../types';

export const steerHealthTechnologyDefinition = {
	id: "steer-health",
	name: "Steer Health",
	website: "https://steerhealth.io",
	description: "Steer Health is an AI healthcare platform designed to enhance revenue, reduce costs, and improve patient experience through automation.",
	icon: "SteerHealth.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "steer-health:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.steerhealth\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
