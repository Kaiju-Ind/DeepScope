import type { TechnologyDefinition } from '../../types';

export const jabmoTechnologyDefinition = {
	id: "jabmo",
	name: "Jabmo",
	website: "https://jabmo.com",
	description: "Jabmo is a software platform that automates lead generation by tracking and analyzing website visitor activity.",
	icon: "Jabmo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "jabmo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/jabmo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
