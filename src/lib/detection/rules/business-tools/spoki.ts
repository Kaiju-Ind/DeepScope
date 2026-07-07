import type { TechnologyDefinition } from '../../types';

export const spokiTechnologyDefinition = {
	id: "spoki",
	name: "Spoki",
	website: "https://spoki.it",
	description: "Spoki is a WhatsApp conversational platform designed to provide marketing, sales, and customer support.",
	icon: "Spoki.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "spoki:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.spoki\\.it\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spoki:dom:1",
			kind: "dom",
			selector: "style#spoki-style-buttons",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
