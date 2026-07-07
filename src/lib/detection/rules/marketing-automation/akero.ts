import type { TechnologyDefinition } from '../../types';

export const akeroTechnologyDefinition = {
	id: "akero",
	name: "Akero",
	website: "https://akerolabs.com",
	description: "Akero is a platform that provides marketing and admissions technology designed for educational institutions.",
	icon: "Akero.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "akero:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.akerolabs\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
