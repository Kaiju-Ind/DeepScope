import type { TechnologyDefinition } from '../../types';

export const evolveMediaTechnologyDefinition = {
	id: "evolve-media",
	name: "Evolve Media",
	website: "https://www.evolvemediallc.com",
	description: "Evolve Media is a publishing platform that offers contextual environments for partners to connect and engage with millions of loyal readers through passionate writing and artful storytelling.",
	icon: "EvolveMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "evolve-media:jsGlobal:0",
			kind: "jsGlobal",
			property: "EvolveGtagId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "evolve-media:jsGlobal:1",
			kind: "jsGlobal",
			property: "EvolveMediaMainSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
