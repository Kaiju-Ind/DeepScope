import type { TechnologyDefinition } from '../../types';

export const gigalixirTechnologyDefinition = {
	id: "gigalixir",
	name: "Gigalixir",
	website: "https://gigalixir.com/",
	description: "Gigalixir is a PaaS focused on deployments of Elixir and Phoenix web apps.",
	icon: "Gigalixir.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "gigalixir:url:0",
			kind: "url",
			pattern: new RegExp("\\.gigalixirapp\\.com"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
