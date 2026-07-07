import type { TechnologyDefinition } from '../../types';

export const slingshotTechnologyDefinition = {
	id: "slingshot",
	name: "Slingshot",
	website: "https://getslingshot.com",
	description: "Slingshot is a platform that integrates real-time analytics with project management and collaboration tools to support data-driven decision-making.",
	icon: "Slingshot.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "slingshot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getslingshot\\.com\\/"),
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
