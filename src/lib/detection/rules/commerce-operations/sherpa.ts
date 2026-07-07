import type { TechnologyDefinition } from '../../types';

export const sherpaTechnologyDefinition = {
	id: "sherpa",
	name: "Sherpa",
	website: "https://www.sherpa.net.au",
	description: "Sherpa is a platform that provides on-demand courier services in Australia, enabling delivery of goods from various locations.",
	icon: "Sherpa.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sherpa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("plugin-app\\.sherpa\\.net\\.au"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
