import type { TechnologyDefinition } from '../../types';

export const adtribaTechnologyDefinition = {
	id: "adtriba",
	name: "Adtriba",
	website: "https://funnel.io/adtriba",
	description: "Adtriba is a platform that captures all marketing touchpoints and calculates the profitability of each campaign using big data technology and AI.",
	icon: "Adtriba.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "adtriba:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.adtriba\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
