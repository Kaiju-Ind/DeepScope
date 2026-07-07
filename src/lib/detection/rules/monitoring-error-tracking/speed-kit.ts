import type { TechnologyDefinition } from '../../types';

export const speedKitTechnologyDefinition = {
	id: "speed-kit",
	name: "Speed Kit",
	website: "https://www.speedkit.com",
	description: "Speed Kit develops a performance add-on that uses caching algorithms to minimize loading times of ecommerce websites.",
	icon: "Speed Kit.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "speed-kit:jsGlobal:0",
			kind: "jsGlobal",
			property: "speedKit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
