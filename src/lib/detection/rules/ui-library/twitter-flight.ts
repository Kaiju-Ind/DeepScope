import type { TechnologyDefinition } from '../../types';

export const twitterFlightTechnologyDefinition = {
	id: "twitter-flight",
	name: "Twitter Flight",
	website: "https://flightjs.github.io/",
	description: "Twitter Flight is a lightweight, component-based JavaScript framework for building web applications.",
	icon: "Twitter Flight.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "twitter-flight:jsGlobal:0",
			kind: "jsGlobal",
			property: "flight",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
