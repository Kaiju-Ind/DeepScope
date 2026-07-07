import type { TechnologyDefinition } from '../../types';

export const affiliateBTechnologyDefinition = {
	id: "affiliate-b",
	name: "Affiliate B",
	website: "https://affiliate-b.com",
	description: "Affiliate B is an advertising system that allows site operators (HP, blogs, e-mail newsletters, etc.) to place advertiser advertisements on their own sites.",
	icon: "Affiliate B.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "affiliate-b:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("t\\.afi-b\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "affiliate-b:dom:1",
			kind: "dom",
			selector: "img[src*='www.afi-b.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
