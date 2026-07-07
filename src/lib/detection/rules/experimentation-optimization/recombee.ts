import type { TechnologyDefinition } from '../../types';

export const recombeeTechnologyDefinition = {
	id: "recombee",
	name: "Recombee",
	website: "https://www.recombee.com",
	description: "Recombee is a Recommender as a Service offering a RESTful API and SDKs, custom-tailored by data scientists.",
	icon: "Recombee.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "recombee:jsGlobal:0",
			kind: "jsGlobal",
			property: "obsPostRecombee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recombee:jsGlobal:1",
			kind: "jsGlobal",
			property: "obsRecombee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recombee:jsGlobal:2",
			kind: "jsGlobal",
			property: "recombee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recombee:jsGlobal:3",
			kind: "jsGlobal",
			property: "recombeeClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
