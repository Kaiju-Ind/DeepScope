import type { TechnologyDefinition } from '../../types';

export const foxappyTechnologyDefinition = {
	id: "foxappy",
	name: "FoxAppy",
	website: "https://foxappy.com",
	description: "FoxAppy is a service that converts ecommerce platforms into native mobile applications for mobile devices.",
	icon: "FoxAppy.svg",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "foxappy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("com\\.foxappy\\."),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
