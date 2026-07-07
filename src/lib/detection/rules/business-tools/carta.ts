import type { TechnologyDefinition } from '../../types';

export const cartaTechnologyDefinition = {
	id: "carta",
	name: "Carta",
	website: "https://carta.com",
	description: "Carta is a platform for cap tables, equity management, and startup ownership records.",
	icon: "Carta.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "carta:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.carta\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "carta:dom:1",
			kind: "dom",
			selector: "link[href*='.app.carta.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
