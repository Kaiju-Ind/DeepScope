import type { TechnologyDefinition } from '../../types';

export const siteyTechnologyDefinition = {
	id: "sitey",
	name: "Sitey",
	website: "https://app.sitey.com",
	description: "Sitey is a website builder that enables users to create and customize websites using drag-and-drop tools.",
	icon: "Sitey.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitey:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("embed\\.sitey\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
