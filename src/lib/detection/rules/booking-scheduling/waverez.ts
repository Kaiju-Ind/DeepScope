import type { TechnologyDefinition } from '../../types';

export const waverezTechnologyDefinition = {
	id: "waverez",
	name: "WaveRez",
	website: "https://waverez.com",
	description: "WaveRez is an online booking software platform designed for the watersport and boat tour industry.",
	icon: "WaveRez.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "waverez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("reservations\\.waverez\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
