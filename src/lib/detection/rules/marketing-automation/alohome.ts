import type { TechnologyDefinition } from '../../types';

export const alohomeTechnologyDefinition = {
	id: "alohome",
	name: "Alohome",
	website: "https://en.alohome.io",
	description: "Alohome is a tech platform designed to enhance real estate sales conversions.",
	icon: "Alohome.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "alohome:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.alohome\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
