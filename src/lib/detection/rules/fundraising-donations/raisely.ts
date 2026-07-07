import type { TechnologyDefinition } from '../../types';

export const raiselyTechnologyDefinition = {
	id: "raisely",
	name: "Raisely",
	website: "https://raisely.com",
	description: "Raisely is a cloud-based fundraising platform that helps non-profits and charities drive fundraising campaigns and collect donations.",
	icon: "Raisely.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "raisely:jsGlobal:0",
			kind: "jsGlobal",
			property: "RaiselyComponents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raisely:jsGlobal:1",
			kind: "jsGlobal",
			property: "__raiselyDebug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raisely:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpRaisely",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
