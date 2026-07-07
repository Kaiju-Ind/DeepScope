import type { TechnologyDefinition } from '../../types';

export const tokenOfTrustTechnologyDefinition = {
	id: "token-of-trust",
	name: "Token of Trust",
	website: "https://tokenoftrust.com",
	description: "Token of Trust is a compliance and anti-fraud platform designed to help ecommerce businesses mitigate risk and support growth through end-to-end verification tools.",
	icon: "TokenOfTrust.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "token-of-trust:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tokenoftrust\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "token-of-trust:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.tokenoftrust\\.com"),
			description: "Script content contains a bounded technology signature.",
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
