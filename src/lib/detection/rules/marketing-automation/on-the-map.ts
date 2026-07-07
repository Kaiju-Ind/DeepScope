import type { TechnologyDefinition } from '../../types';

export const onTheMapTechnologyDefinition = {
	id: "on-the-map",
	name: "On The Map",
	website: "https://www.onthemap.com",
	description: "On The Map is a local business marketing system designed to help companies enhance visibility, manage online presence, and attract nearby customers through targeted digital strategies and data-driven tools.",
	icon: "OnTheMap.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "on-the-map:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.onthemapmarketing\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
