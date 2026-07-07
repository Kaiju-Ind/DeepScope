import type { TechnologyDefinition } from '../../types';

export const estateTrackTechnologyDefinition = {
	id: "estate-track",
	name: "Estate Track",
	website: "https://estatetrack.co.uk",
	description: "Estate Track is an all-in-one website platform for estate agents that facilitates automated marketing and lead generation.",
	icon: "EstateTrack.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "estate-track:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.estate-track\\.co\\.uk"),
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
