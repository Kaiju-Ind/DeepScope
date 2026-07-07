import type { TechnologyDefinition } from '../../types';

export const iMobileTechnologyDefinition = {
	id: "i-mobile",
	name: "i-mobile",
	website: "https://www2.i-mobile.co.jp",
	description: "i-mobile is an advertising platform for clients to advertise their product and for publishers to monetize their cyberspace.",
	icon: "i-mobile.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "i-mobile:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.i-mobile\\.co\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "i-mobile:dom:1",
			kind: "dom",
			selector: "img[src*='.i-mobile.co.jp/']",
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
