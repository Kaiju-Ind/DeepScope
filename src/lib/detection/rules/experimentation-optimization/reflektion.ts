import type { TechnologyDefinition } from '../../types';

export const reflektionTechnologyDefinition = {
	id: "reflektion",
	name: "Reflektion",
	website: "https://reflektion.com",
	description: "Reflektion is a customer centric personalisation platform that optimizes customer experiences on an individual basis in real time.",
	icon: "Reflektion.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "reflektion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudfront\\.net\\/js\\/reflektion\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reflektion:jsGlobal:1",
			kind: "jsGlobal",
			property: "RFK_DEPLOY_TIME",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reflektion:jsGlobal:2",
			kind: "jsGlobal",
			property: "RfkParams",
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
