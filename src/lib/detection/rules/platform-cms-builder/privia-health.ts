import type { TechnologyDefinition } from '../../types';

export const priviaHealthTechnologyDefinition = {
	id: "privia-health",
	name: "Privia Health",
	website: "https://www.priviahealth.com",
	description: "Privia Health is a quality healthcare experience tool designed to enhance patient care and streamline healthcare operations.",
	icon: "PriviaHealth.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "privia-health:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.myprivia\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
