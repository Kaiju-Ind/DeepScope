import type { TechnologyDefinition } from '../../types';

export const moosendTechnologyDefinition = {
	id: "moosend",
	name: "Moosend",
	website: "https://moosend.com",
	description: "Moosend is a platform that enables management, creation, and distribution of email marketing campaigns.",
	icon: "Moosend.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "moosend:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.moosend\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
