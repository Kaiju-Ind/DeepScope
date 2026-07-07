import type { TechnologyDefinition } from '../../types';

export const launchlmsTechnologyDefinition = {
	id: "launchlms",
	name: "LaunchLMS",
	website: "https://launchlms.com.br",
	description: "LaunchLMS is a learning management system that provides a customizable platform designed to adapt to different business training and development needs.",
	icon: "LaunchLMS.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "launchlms:dom:0",
			kind: "dom",
			selector: "link[href*='static.launchlab.com.br/']",
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
