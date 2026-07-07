import type { TechnologyDefinition } from '../../types';

export const gettermsTechnologyDefinition = {
	id: "getterms",
	name: "GetTerms",
	website: "https://getterms.io",
	description: "GetTerms is a tool that generates privacy policies for web platforms.",
	icon: "GetTerms.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "getterms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getterms\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
