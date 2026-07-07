import type { TechnologyDefinition } from '../../types';

export const lumioTechnologyDefinition = {
	id: "lumio",
	name: "Lumio",
	website: "https://lumio-analytics.com/",
	description: "Lumio is a tool that identifies and tracks visitors to your website, providing insights into user activity and behaviour.",
	icon: "Lumio.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "lumio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.lumio-analytics\\.com\\/"),
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
