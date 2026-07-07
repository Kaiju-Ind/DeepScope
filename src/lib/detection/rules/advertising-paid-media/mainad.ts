import type { TechnologyDefinition } from '../../types';

export const mainadTechnologyDefinition = {
	id: "mainad",
	name: "MainAd",
	website: "https://www.mainad.com",
	description: "MainAd is an international advertising technology company specialising in real-time bidding and programmatic ad retargeting.",
	icon: "MainAd.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mainad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mainadv\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mainad:dom:1",
			kind: "dom",
			selector: "iframe[src*='.mainadv.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
