import type { TechnologyDefinition } from '../../types';

export const fleeteeTechnologyDefinition = {
	id: "fleetee",
	name: "Fleetee",
	website: "https://en.fleetee.io",
	description: "Fleetee is a platform that enables users to develop and manage rental operations.",
	icon: "Fleetee.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "fleetee:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.fleetee\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
