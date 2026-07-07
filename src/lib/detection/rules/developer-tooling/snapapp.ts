import type { TechnologyDefinition } from '../../types';

export const snapappTechnologyDefinition = {
	id: "snapapp",
	name: "SnapApp",
	website: "https://snapapp.com",
	description: "SnapApp is a low-code application builder that leverages artificial intelligence to accelerate enterprise application development and streamline the creation of business software solutions.",
	icon: "SnapApp.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "snapapp:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.snapapp\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
