import type { TechnologyDefinition } from '../../types';

export const webgainsTechnologyDefinition = {
	id: "webgains",
	name: "Webgains",
	website: "https://www.webgains.com/",
	description: "Webgains is an affiliate marketing network.",
	icon: "Webgains.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "webgains:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.webgains\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webgains:jsGlobal:1",
			kind: "jsGlobal",
			property: "ITCLKQ",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
