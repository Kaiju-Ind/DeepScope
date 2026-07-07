import type { TechnologyDefinition } from '../../types';

export const casaasTechnologyDefinition = {
	id: "casaas",
	name: "caSaaS",
	website: "https://casaas.com",
	description: "caSaaS is a Content Management System that enables users to create, organize, and manage digital content.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "casaas:meta:0",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("caSaaS ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "casaas:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("casaas ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
