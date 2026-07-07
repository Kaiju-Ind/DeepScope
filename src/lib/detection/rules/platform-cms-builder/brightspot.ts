import type { TechnologyDefinition } from '../../types';

export const brightspotTechnologyDefinition = {
	id: "brightspot",
	name: "Brightspot",
	website: "https://www.brightspot.com",
	description: "Brightspot is an enterprise content management system for managing and publishing digital content.",
	icon: "Brightspot.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brightspot:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Brightspot$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "brightspot:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brightspotcdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brightspot:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpJsonpBrightspot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brightspot:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^brightspot$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
