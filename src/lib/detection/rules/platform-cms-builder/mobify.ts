import type { TechnologyDefinition } from '../../types';

export const mobifyTechnologyDefinition = {
	id: "mobify",
	name: "Mobify",
	website: "https://www.mobify.com",
	description: "Mobify is a web storefront platform for headless commerce.",
	icon: "Mobify.png",
	categories: [
		"platform-cms-builder",
		"mobile",
	],
	rules: [
		{
			id: "mobify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/cdn\\.mobify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mobify:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/a\\.mobify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mobify:jsGlobal:2",
			kind: "jsGlobal",
			property: "Mobify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mobify:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Mobify", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mobify:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mobify", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
