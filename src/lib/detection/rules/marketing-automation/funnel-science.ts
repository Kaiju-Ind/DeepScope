import type { TechnologyDefinition } from '../../types';

export const funnelScienceTechnologyDefinition = {
	id: "funnel-science",
	name: "Funnel Science",
	website: "https://www.funnelscience.com",
	description: "Funnel Science is a sales and marketing software that leverages data to provide a competitive advantage.",
	icon: "FunnelScience.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "funnel-science:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.funnelscience\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
