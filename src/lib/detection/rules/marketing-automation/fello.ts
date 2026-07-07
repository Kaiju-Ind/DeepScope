import type { TechnologyDefinition } from '../../types';

export const felloTechnologyDefinition = {
	id: "fello",
	name: "Fello",
	website: "https://hifello.com",
	description: "Fello is a seller lead generation platform created by agents for agents. It provides modern agents with a lead funnel designed to retain serious sellers.",
	icon: "Fello.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fello:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hifello\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
