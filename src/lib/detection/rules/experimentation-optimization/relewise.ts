import type { TechnologyDefinition } from '../../types';

export const relewiseTechnologyDefinition = {
	id: "relewise",
	name: "Relewise",
	website: "https://relewise.com",
	description: "Relewise is a platform that uses personalisation technology to provide customised online experiences through personalised search and recommendations.",
	icon: "Relewise.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "relewise:dom:0",
			kind: "dom",
			selector: "link[href*='api.relewise.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "relewise:jsGlobal:1",
			kind: "jsGlobal",
			property: "relewiseConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "relewise:jsGlobal:2",
			kind: "jsGlobal",
			property: "relewiseTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
