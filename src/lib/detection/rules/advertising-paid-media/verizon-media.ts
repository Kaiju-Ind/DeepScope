import type { TechnologyDefinition } from '../../types';

export const verizonMediaTechnologyDefinition = {
	id: "verizon-media",
	name: "Verizon Media",
	website: "https://www.verizonmedia.com",
	description: "Verizon Media is a tech and media company with global assets for advertisers, consumers and media companies.",
	icon: "Verizon Media.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "verizon-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.advertising\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verizon-media:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vidible\\.tv\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verizon-media:dom:2",
			kind: "dom",
			selector: "img[src*='pixel.advertising.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
