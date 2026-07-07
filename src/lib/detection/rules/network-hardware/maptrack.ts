import type { TechnologyDefinition } from '../../types';

export const maptrackTechnologyDefinition = {
	id: "maptrack",
	name: "MapTrack",
	website: "https://maptrack.com",
	description: "MapTack is a platform to audit and manage assets from a single interface.",
	icon: "MapTrack.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "maptrack:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.maptrackpro\\.com"),
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
