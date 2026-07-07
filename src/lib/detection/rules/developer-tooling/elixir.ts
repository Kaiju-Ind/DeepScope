import type { TechnologyDefinition } from '../../types';

export const elixirTechnologyDefinition = {
	id: "elixir",
	name: "Elixir",
	website: "https://elixir-lang.org",
	description: "Elixir is a dynamic, functional language designed for building scalable and maintainable applications.",
	icon: "Elixir.svg",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		oss: true,
	},
	implies: [
		"erlang",
	],
} as const satisfies TechnologyDefinition;
