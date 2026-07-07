import type { TechnologyDefinition } from '../../types';

export const prositesTechnologyDefinition = {
	id: "prosites",
	name: "ProSites",
	website: "https://www.prosites.com",
	description: "ProSites is a website solution designed for medical and dental professionals.",
	icon: "ProSites.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prosites:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.prosites\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
