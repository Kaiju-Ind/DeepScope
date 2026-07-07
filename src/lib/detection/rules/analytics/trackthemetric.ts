import type { TechnologyDefinition } from '../../types';

export const trackthemetricTechnologyDefinition = {
	id: "trackthemetric",
	name: "trackthemetric",
	website: "https://trackthemetric.com",
	description: "trackthemetric is a privacy-focused analytics platform that provides insights into website traffic and online revenue from a single interface.",
	icon: "trackthemetric.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trackthemetric:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.trackthemetric\\.com"),
			description: "Script source URL matches a known technology marker.",
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
