import type { TechnologyDefinition } from '../../types';

export const pushifyTechnologyDefinition = {
	id: "pushify",
	name: "Pushify",
	website: "https://pushify.com",
	description: "Pushify is a service that delivers push notifications for major desktop and mobile browsers.",
	icon: "Pushify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pushify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
