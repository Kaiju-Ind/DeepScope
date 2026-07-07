import type { TechnologyDefinition } from '../../types';

export const primisTechnologyDefinition = {
	id: "primis",
	name: "Primis",
	website: "https://www.primis.tech",
	description: "Primis is a video discovery platform for publishers.",
	icon: "Primis.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "primis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sekindo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "primis:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.sekindo\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "primis:dom:2",
			kind: "dom",
			selector: "iframe[src*='.sekindo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "primis:dom:3",
			kind: "dom",
			selector: "img[src*='.sekindo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "primis:jsGlobal:4",
			kind: "jsGlobal",
			property: "SekindoNativeSkinApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "primis:jsGlobal:5",
			kind: "jsGlobal",
			property: "sekindoDisplayedPlacement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "primis:jsGlobal:6",
			kind: "jsGlobal",
			property: "sekindoFlowingPlayerOn",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
