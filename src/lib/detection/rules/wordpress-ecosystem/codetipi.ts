import type { TechnologyDefinition } from '../../types';

export const codetipiTechnologyDefinition = {
	id: "codetipi",
	name: "Codetipi",
	website: "https://codetipi.com",
	description: "Codetipi is a provider of WordPress themes and plugins designed for premium users.",
	icon: "Codetipi.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "codetipi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("codetipi-"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
