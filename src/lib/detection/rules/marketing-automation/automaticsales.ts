import type { TechnologyDefinition } from '../../types';

export const automaticsalesTechnologyDefinition = {
	id: "automaticsales",
	name: "AutomaticSales",
	website: "https://automaticsales.ai",
	description: "AutomaticSales is a platform that centralizes marketing tools, offering unlimited sales funnels, email, SMS, web chat, and additional features in one system.",
	icon: "AutomaticSales.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "automaticsales:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.automaticsales\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
