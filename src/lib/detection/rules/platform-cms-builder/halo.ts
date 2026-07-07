import type { TechnologyDefinition } from '../../types';

export const haloTechnologyDefinition = {
	id: "halo",
	name: "Halo",
	website: "https://halo.run",
	description: "Halo is a powerful, user-friendly open-source website building tool that supports dynamic themes, real-time editing, and multilingual setups.",
	icon: "Halo.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "halo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Halo ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "halo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("halo ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:halo:halo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
