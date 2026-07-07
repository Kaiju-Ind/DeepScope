import type { TechnologyDefinition } from '../../types';

export const interagoTechnologyDefinition = {
	id: "interago",
	name: "Interago",
	website: "https://www.interago.com.br",
	description: "Interago is a Brazilian platform that aggregates modern digital tools to support and streamline online business operations.",
	icon: "Interago.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "interago:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.interago\\.com\\.br"),
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
