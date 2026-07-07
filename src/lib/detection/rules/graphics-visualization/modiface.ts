import type { TechnologyDefinition } from '../../types';

export const modifaceTechnologyDefinition = {
	id: "modiface",
	name: "ModiFace",
	website: "https://modiface.com",
	description: "ModiFace is a provider of Augmented Reality technology for the beauty industry.",
	icon: "ModiFace.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "modiface:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.modiface\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "modiface:dom:1",
			kind: "dom",
			selector: "iframe[src*='.modiface.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "modiface:jsGlobal:2",
			kind: "jsGlobal",
			property: "initModiface",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "modiface:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.modiface\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
