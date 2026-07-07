import type { TechnologyDefinition } from '../../types';

export const onecauseTechnologyDefinition = {
	id: "onecause",
	name: "OneCause",
	website: "https://www.onecause.com",
	description: "OneCause is a fundraising platform designed for nonprofits to manage all types of fundraising campaigns.",
	icon: "OneCause.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "onecause:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.onecause\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onecause:dom:1",
			kind: "dom",
			selector: "a[href*='.onecause.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
