import type { TechnologyDefinition } from '../../types';

export const yahooAdvertisingTechnologyDefinition = {
	id: "yahoo-advertising",
	name: "Yahoo Advertising",
	website: "https://www.adtech.yahooinc.com",
	description: "Yahoo Advertising includes a comprehensive suite of web, mobile, and video ad products across native, audience, and premium display, which are accessible through a new buying platform.",
	icon: "Yahoo.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "yahoo-advertising:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:adinterax|adserver\\.yahoo)\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:dom:1",
			kind: "dom",
			selector: "link[href*='bc.yahoo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:jsGlobal:2",
			kind: "jsGlobal",
			property: "adxinserthtml",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:jsGlobal:3",
			kind: "jsGlobal",
			property: "yahooCvLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:jsGlobal:4",
			kind: "jsGlobal",
			property: "yahoo_retargeting_pv_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:jsGlobal:5",
			kind: "jsGlobal",
			property: "yahoo_ydn_conv_label",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yahoo-advertising:jsGlobal:6",
			kind: "jsGlobal",
			property: "yahoo_ydn_conv_transaction_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
