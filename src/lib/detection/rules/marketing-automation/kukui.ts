import type { TechnologyDefinition } from '../../types';

export const kukuiTechnologyDefinition = {
	id: "kukui",
	name: "KUKUI",
	website: "https://www.kukui.com",
	description: "KUKUI is an all-in-one solution designed to enhance profitability, streamline lead management, and boost customer engagement for shop marketing.",
	icon: "KUKUI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kukui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kukui\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
