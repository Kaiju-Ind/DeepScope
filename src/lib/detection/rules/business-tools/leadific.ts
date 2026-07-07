import type { TechnologyDefinition } from '../../types';

export const leadificTechnologyDefinition = {
	id: "leadific",
	name: "Leadific",
	website: "https://leadific.co",
	description: "Leadific is a customer relationship management platform designed to help digital agencies manage clients, track communications, and streamline workflows in a single system.",
	icon: "Leadific.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "leadific:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.leadific\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
