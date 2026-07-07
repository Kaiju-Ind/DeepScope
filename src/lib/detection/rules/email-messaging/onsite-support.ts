import type { TechnologyDefinition } from '../../types';

export const onsiteSupportTechnologyDefinition = {
	id: "onsite-support",
	name: "Onsite Support",
	website: "https://onsitesupport.io",
	description: "Onsite Support is a platform that uses AI-enhanced helpdesk tools to reduce operational costs, minimize product returns, and accelerate customer service response times.",
	icon: "OnSiteSupport.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "onsite-support:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.onsitesupport\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
