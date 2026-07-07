import type { TechnologyDefinition } from '../../types';

export const technology8baseTechnologyDefinition = {
	id: "8base",
	name: "8base",
	website: "https://8base.com",
	description: "8base is a low-code development platform for building and running enterprise-grade digital products including SaaS solutions, marketplaces and other go-to-market applications.",
	icon: "8base.svg",
	categories: [
		"server-runtime-infra",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "8base:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.8base\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
