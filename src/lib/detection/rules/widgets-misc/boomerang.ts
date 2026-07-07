import type { TechnologyDefinition } from '../../types';

export const boomerangTechnologyDefinition = {
	id: "boomerang",
	name: "Boomerang",
	website: "https://akamai.github.io/boomerang",
	description: "boomerang is a JavaScript library that measures the page load time experienced by real users, commonly called RUM (Real User Measurement).",
	icon: "boomerang.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "boomerang:jsGlobal:0",
			kind: "jsGlobal",
			property: "BOOMR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boomerang:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOOMR_lstart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boomerang:jsGlobal:2",
			kind: "jsGlobal",
			property: "BOOMR_mq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
