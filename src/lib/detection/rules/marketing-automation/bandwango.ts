import type { TechnologyDefinition } from '../../types';

export const bandwangoTechnologyDefinition = {
	id: "bandwango",
	name: "Bandwango",
	website: "https://www.bandwango.com",
	description: "Bandwango is a platform that boosts community revenue by promoting local businesses and attractions while tracking visitor interactions to support economic growth.",
	icon: "Bandwango.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bandwango:dom:0",
			kind: "dom",
			selector: "a[href*='www.bandwango.com'] > img[src*='app.bandwango.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
