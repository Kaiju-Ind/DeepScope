import type { TechnologyDefinition } from '../../types';

export const apilayerTechnologyDefinition = {
	id: "apilayer",
	name: "APILayer",
	website: "https://apilayer.com",
	description: "APILayer is an API marketplace that provides scalable APIs across multiple categories, including artificial intelligence and finance.",
	icon: "APILayer.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "apilayer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.apilayer\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
