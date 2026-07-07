import type { TechnologyDefinition } from '../../types';

export const embedlyTechnologyDefinition = {
	id: "embedly",
	name: "Embedly",
	website: "https://embed.ly",
	description: "Embedly is a service that allows developers to convert URLs into rich previews and embeddable content.",
	icon: "Embedly.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "embedly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.embedly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "embedly:jsGlobal:1",
			kind: "jsGlobal",
			property: "embedly",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "embedly:dom:2",
			kind: "dom",
			selector: "div.w-embed > iframe.embedly-embed",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
