import type { TechnologyDefinition } from '../../types';

export const preprTechnologyDefinition = {
	id: "prepr",
	name: "Prepr",
	website: "https://prepr.io",
	description: "Prepr is a headless CMS with data-driven capabilities.",
	icon: "Prepr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prepr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.prepr\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prepr:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.files\\.prepr\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "prepr:dom:2",
			kind: "dom",
			selector: "img[src*='.prepr.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "prepr:jsGlobal:3",
			kind: "jsGlobal",
			property: "prepr",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prepr:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^__prepr_uid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "prepr:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tracking\\.prepr\\.io\\/js\\/prepr_v2\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
