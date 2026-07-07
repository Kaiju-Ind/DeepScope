import type { TechnologyDefinition } from '../../types';

export const mparticleTechnologyDefinition = {
	id: "mparticle",
	name: "mParticle",
	website: "https://www.mparticle.com",
	description: "mParticle is a mobile-focused event tracking and data ingestion tool.",
	icon: "mParticle.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mparticle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mparticle\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mparticle:jsGlobal:1",
			kind: "jsGlobal",
			property: "mParticle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mparticle:jsGlobal:2",
			kind: "jsGlobal",
			property: "mParticle.config.snippetVersion",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
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
