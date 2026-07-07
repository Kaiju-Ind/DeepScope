import type { TechnologyDefinition } from '../../types';

export const amazonAdvertisingTechnologyDefinition = {
	id: "amazon-advertising",
	name: "Amazon Advertising",
	website: "https://advertising.amazon.com",
	description: "Amazon Advertising (formerly AMS or Amazon Marketing Services) is a service that works in a similar way to pay-per-click ads on Google.",
	icon: "Amazon.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "amazon-advertising:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.amazon-adsystem\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-advertising:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.amazon-adsystem\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "amazon-advertising:dom:2",
			kind: "dom",
			selector: "iframe[src*='.amazon-adsystem.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
