import type { TechnologyDefinition } from '../../types';

export const cxdpTechnologyDefinition = {
	id: "cxdp",
	name: "CXDP",
	website: "https://cxdp.ru",
	description: "CXDP is a platform that enables businesses to create, manage, and deliver personalized marketing communications across multiple channels based on customer data and engagement insights.",
	icon: "CXDP.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cxdp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.cxdp\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
