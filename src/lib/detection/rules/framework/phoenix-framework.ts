import type { TechnologyDefinition } from '../../types';

export const phoenixFrameworkTechnologyDefinition = {
	id: "phoenix-framework",
	name: "Phoenix Framework",
	website: "https://www.phoenixframework.org",
	description: "Phoenix Framework is an open-source web application framework built using the Elixir programming language.",
	icon: "Phoenix Framework.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "phoenix-framework:jsGlobal:0",
			kind: "jsGlobal",
			property: "Phoenix.Channel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:phoenixframework:phoenix:*:*:*:*:*:*:*:*",
	},
	implies: [
		"elixir",
	],
} as const satisfies TechnologyDefinition;
