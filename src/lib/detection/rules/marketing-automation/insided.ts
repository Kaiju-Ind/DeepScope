import type { TechnologyDefinition } from '../../types';

export const insidedTechnologyDefinition = {
	id: "insided",
	name: "inSided",
	website: "https://www.insided.com",
	description: "inSided is the only Customer Success Community Platform built to help SaaS companies improve customer success and retention.",
	icon: "inSided.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "insided:jsGlobal:0",
			kind: "jsGlobal",
			property: "inSidedData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "insided:jsGlobal:1",
			kind: "jsGlobal",
			property: "insided",
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
