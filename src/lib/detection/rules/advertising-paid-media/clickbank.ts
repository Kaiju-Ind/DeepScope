import type { TechnologyDefinition } from '../../types';

export const clickbankTechnologyDefinition = {
	id: "clickbank",
	name: "Clickbank",
	website: "https://www.clickbank.com/",
	description: "ClickBank is an affiliate marketplace and ecommerce platform for digital products.",
	icon: "Clickbank.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clickbank:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("r\\.wdfl\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clickbank:dom:1",
			kind: "dom",
			selector: "a[href*='pay.clickbank.net?cbfid'], img[width='1'][src*='hop.clickbank.net?affiliate']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "clickbank:jsGlobal:2",
			kind: "jsGlobal",
			property: "cbtb",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
