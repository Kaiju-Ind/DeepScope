import type { TechnologyDefinition } from '../../types';

export const mystatTechnologyDefinition = {
	id: "mystat",
	name: "MyStat",
	website: "https://www.mystat.hu",
	description: "MyStat is a Hungarian-based analytics service that provides data insights and tracking capabilities for websites.",
	icon: "MyStat.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mystat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("stat\\.mystat\\.hu"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
