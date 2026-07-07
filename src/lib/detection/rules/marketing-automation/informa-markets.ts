import type { TechnologyDefinition } from '../../types';

export const informaMarketsTechnologyDefinition = {
	id: "informa-markets",
	name: "Informa Markets",
	website: "https://www.informamarkets.com",
	description: "Informa Markets is a platform that facilitates trade, innovation, and growth across various industries and specialist markets.",
	icon: "InformaMarkets.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "informa-markets:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("connect\\.informamarkets\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
