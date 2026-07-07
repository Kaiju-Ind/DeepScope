import type { TechnologyDefinition } from '../../types';

export const outfunnelTechnologyDefinition = {
	id: "outfunnel",
	name: "Outfunnel",
	website: "https://outfunnel.com",
	description: "Outfunnel is a platform that connects sales and marketing data to streamline workflows and improve data alignment across tools.",
	icon: "Outfunnel.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "outfunnel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.outfunnel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outfunnel:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.outfunnel\\.com"),
			description: "Script content contains a bounded technology signature.",
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
