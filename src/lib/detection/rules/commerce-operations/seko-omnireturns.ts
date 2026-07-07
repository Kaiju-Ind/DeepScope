import type { TechnologyDefinition } from '../../types';

export const sekoOmnireturnsTechnologyDefinition = {
	id: "seko-omnireturns",
	name: "Seko OmniReturns",
	website: "https://www.sekologistics.com/us/global-cross-border-returns",
	description: "Seko OmniReturns is an online portal used on ecommerce websites for customers to create returns and shipping labels globally. Seko is a global logistics company offering both the technology and reverse logistics.",
	icon: "Seko OmniReturns.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "seko-omnireturns:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/cdn\\.omniparcelreturns\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
