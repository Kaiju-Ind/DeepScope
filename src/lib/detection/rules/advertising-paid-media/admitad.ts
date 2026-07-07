import type { TechnologyDefinition } from '../../types';

export const admitadTechnologyDefinition = {
	id: "admitad",
	name: "Admitad",
	website: "https://www.admitad.com",
	description: "Admitad is an affiliate network that acts as an intermediary between advertisers and publishers.",
	icon: "Admitad.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "admitad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("artfut\\.com\\/static\\/(?:tracking|crossdevice)\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "admitad:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.admitad\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "admitad:jsGlobal:2",
			kind: "jsGlobal",
			property: "ADMITAD",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "admitad:jsGlobal:3",
			kind: "jsGlobal",
			property: "admitad",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
