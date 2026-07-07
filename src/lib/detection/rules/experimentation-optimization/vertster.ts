import type { TechnologyDefinition } from '../../types';

export const vertsterTechnologyDefinition = {
	id: "vertster",
	name: "Vertster",
	website: "https://vertster.com",
	description: "Vertster is a multivariate testing platform that enables users to compare multiple webpage or app variations simultaneously to identify which combination of elements performs best based on user behavior and data analysis.",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "vertster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.vertster\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vertster:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.vertster\\.com"),
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
