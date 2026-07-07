import type { TechnologyDefinition } from '../../types';

export const clientacquisitionTechnologyDefinition = {
	id: "clientacquisition",
	name: "Clientacquisition",
	website: "https://www.clientacquisition.io",
	description: "Clientacquisition is a provider of tailored infrastructure solutions that drive growth.",
	icon: "Clientacquisition.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "clientacquisition:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.clientacquisition\\.io"),
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
