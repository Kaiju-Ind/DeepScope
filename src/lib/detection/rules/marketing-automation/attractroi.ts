import type { TechnologyDefinition } from '../../types';

export const attractroiTechnologyDefinition = {
	id: "attractroi",
	name: "AttractROI",
	website: "https://attractroi.com",
	description: "AttractROI is a service that provides tools and resources to help businesses convert potential customers into loyal clients.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "attractroi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.attractroi\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
