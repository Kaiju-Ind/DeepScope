import type { TechnologyDefinition } from '../../types';

export const createDemandTechnologyDefinition = {
	id: "create-demand",
	name: "Create Demand",
	website: "https://createdemand.ai",
	description: "Create Demand is an all-in-one sales and marketing platform designed to support business owners in managing and growing their sales and marketing operations.",
	icon: "CreateDemand.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "create-demand:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.createdemand\\.ai"),
			description: "Script content contains a bounded technology signature.",
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
