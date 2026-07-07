import type { TechnologyDefinition } from '../../types';

export const novadbTechnologyDefinition = {
	id: "novadb",
	name: "NovaDB",
	website: "https://www.novadb.com",
	description: "NovaDB is a unified content cloud that combines headless CMS and product information management to create, manage, and deliver structured digital content.",
	icon: "NovaDB.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "novadb:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^NovaDB$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "novadb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^novadb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
