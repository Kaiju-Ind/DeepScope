import type { TechnologyDefinition } from '../../types';

export const saleswingsTechnologyDefinition = {
	id: "saleswings",
	name: "SalesWings",
	website: "https://www.saleswingsapp.com",
	description: "SalesWings is a tool that evaluates and identifies high-quality sales leads based on engagement and interest metrics.",
	icon: "SalesWings.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "saleswings:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s\\.saleswingsapp\\.com"),
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
