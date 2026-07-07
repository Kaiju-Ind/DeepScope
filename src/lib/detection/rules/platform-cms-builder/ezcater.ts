import type { TechnologyDefinition } from '../../types';

export const ezcaterTechnologyDefinition = {
	id: "ezcater",
	name: "eZCater",
	website: "https://www.ezcater.com",
	description: "ezCater is a platform that enables businesses to order and manage office catering services from local and national restaurants.",
	icon: "ezCater.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ezcater:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.ezcater\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
