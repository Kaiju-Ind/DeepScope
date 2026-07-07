import type { TechnologyDefinition } from '../../types';

export const eployTechnologyDefinition = {
	id: "eploy",
	name: "Eploy",
	website: "https://www.eploy.co.uk",
	description: "Eploy is an end-to-end multilingual e-recruitment platform that helps to manage the entire recruitment process from job requisition through to onboarding.",
	icon: "Eploy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "eploy:jsGlobal:0",
			kind: "jsGlobal",
			property: "$Eploy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eploy:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^Eploy\\.Session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "eploy:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^eploy\\.session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
