import type { TechnologyDefinition } from '../../types';

export const rioseoTechnologyDefinition = {
	id: "rioseo",
	name: "RioSEO",
	website: "https://www.rioseo.com",
	description: "RioSEO is a provider of management and local search marketing solutions operating at a global scale.",
	icon: "RioSEO.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rioseo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("rlscdn\\.rioseo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
