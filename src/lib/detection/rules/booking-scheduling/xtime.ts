import type { TechnologyDefinition } from '../../types';

export const xtimeTechnologyDefinition = {
	id: "xtime",
	name: "Xtime",
	website: "https://xtime.com",
	description: "Xtime is a company that provides automotive service scheduling and management solutions primarily for car dealerships and automotive service centers.",
	icon: "Xtime.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "xtime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.xtime\\.com\\/scheduling"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xtime:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("xtime\\.net\\.au"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "xtime:dom:2",
			kind: "dom",
			selector: "a[data-modified-by='xtime']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xtime:dom:3",
			kind: "dom",
			selector: "iframe[src*='xtime.net.au']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xtime:dom:4",
			kind: "dom",
			selector: "iframe[src*='x-time']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xtime:jsGlobal:5",
			kind: "jsGlobal",
			property: "xtime",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xtime:header:6",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("\\.xtime\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xtime:header:7",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("\\.xtime\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "xtime:dom:8",
			kind: "dom",
			selector: "a[data-modified-by='xtime'],iframe[src*='xtime.net.au'],iframe[src*='x-time']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
