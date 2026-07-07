import type { TechnologyDefinition } from '../../types';

export const accuweatherTechnologyDefinition = {
	id: "accuweather",
	name: "AccuWeather",
	website: "https://partners.accuweather.com",
	description: "AccuWeather provides weather forecasts and warnings and additional weather products and services.",
	icon: "AccuWeather.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "accuweather:dom:0",
			kind: "dom",
			selector: "a[href*='.accuweather.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
