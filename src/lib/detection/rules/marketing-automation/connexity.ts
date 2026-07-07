import type { TechnologyDefinition } from '../../types';

export const connexityTechnologyDefinition = {
	id: "connexity",
	name: "Connexity",
	website: "https://www.connexity.com",
	description: "Connexity is a platform that focuses on audience targeting, data management, optimization, attribution, and insight generation for enhanced marketing strategies.",
	icon: "Connexity.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "connexity:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("connexity\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
