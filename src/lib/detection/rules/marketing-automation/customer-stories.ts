import type { TechnologyDefinition } from '../../types';

export const customerStoriesTechnologyDefinition = {
	id: "customer-stories",
	name: "Customer Stories",
	website: "https://customerstories.net",
	description: "Customer Stories is a customer marketing automation platform designed to support modern marketing and sales teams in streamlining engagement and outreach efforts.",
	icon: "CustomerStories.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "customer-stories:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.customerstories\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
