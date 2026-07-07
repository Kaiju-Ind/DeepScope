import type { TechnologyDefinition } from '../../types';

export const thetradedeskTechnologyDefinition = {
	id: "thetradedesk",
	name: "theTradeDesk",
	website: "https://www.thetradedesk.com",
	description: "theTradeDesk is an technology company that markets a software platform used by digital ad buyers to purchase data-driven digital advertising campaigns across various ad formats and devices.",
	icon: "theTradeDesk.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "thetradedesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adsrvr\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thetradedesk:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("adsvr\\.org"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "thetradedesk:dom:2",
			kind: "dom",
			selector: "iframe[src*='insight.adsrvr.org']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "thetradedesk:jsGlobal:3",
			kind: "jsGlobal",
			property: "TTDUniversalPixelApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thetradedesk:jsGlobal:4",
			kind: "jsGlobal",
			property: "ttd_dom_ready",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
