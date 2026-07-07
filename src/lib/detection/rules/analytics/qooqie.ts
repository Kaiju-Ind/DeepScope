import type { TechnologyDefinition } from '../../types';

export const qooqieTechnologyDefinition = {
	id: "qooqie",
	name: "Qooqie",
	website: "https://qooqie.com",
	description: "Qooqie is a call tracking tool designed to monitor and analyze inbound phone calls.",
	icon: "Qooqie.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "qooqie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.qooqie\\.com"),
			description: "Script source URL matches a known technology marker.",
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
