import type { TechnologyDefinition } from '../../types';

export const realyticsTechnologyDefinition = {
	id: "realytics",
	name: "Realytics",
	website: "https://www.realytics.io",
	description: "Realytics is a platform for real-time tracking and analysis of TV advertisements.",
	icon: "Realytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "realytics:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.realytics\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
