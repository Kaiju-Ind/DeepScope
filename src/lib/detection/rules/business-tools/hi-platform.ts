import type { TechnologyDefinition } from '../../types';

export const hiPlatformTechnologyDefinition = {
	id: "hi-platform",
	name: "Hi Platform",
	website: "https://www.hiplatform.com",
	description: "Hi Platform provider of an online customer relationship platform.",
	icon: "Hi Platform.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hi-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hiplatform\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hi-platform:dom:1",
			kind: "dom",
			selector: "link[href*='.hiplatform.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
