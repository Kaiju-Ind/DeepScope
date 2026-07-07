import type { TechnologyDefinition } from '../../types';

export const frosmoTechnologyDefinition = {
	id: "frosmo",
	name: "Frosmo",
	website: "https://frosmo.com",
	description: "Frosmo is a SaaS company which provides AI-driven personalisation products.",
	icon: "Frosmo.png",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "frosmo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("frosmo\\.easy\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "frosmo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_frosmo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "frosmo:jsGlobal:2",
			kind: "jsGlobal",
			property: "frosmo",
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
