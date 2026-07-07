import type { TechnologyDefinition } from '../../types';

export const popsixleTechnologyDefinition = {
	id: "popsixle",
	name: "Popsixle",
	website: "https://popsixle.com",
	description: "Popsixle is a server-side tracking and attribution solution designed to help ecommerce brands capture and send accurate conversion data to ad platforms.",
	icon: "Popsixle.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "popsixle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/popsixle\\.php"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
