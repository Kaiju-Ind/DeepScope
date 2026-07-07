import type { TechnologyDefinition } from '../../types';

export const utiqTechnologyDefinition = {
	id: "utiq",
	name: "Utiq",
	website: "https://utiq.com/",
	description: "Utiq empowers brands and publishers to address audiences through Telco-powered first-party identifier.",
	icon: "Utiq.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "utiq:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/utiqloader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "utiq:jsGlobal:1",
			kind: "jsGlobal",
			property: "Utiq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "utiq:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/utiqLoader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: false,
	},
} as const satisfies TechnologyDefinition;
