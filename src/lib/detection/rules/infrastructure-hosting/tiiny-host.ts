import type { TechnologyDefinition } from '../../types';

export const tiinyHostTechnologyDefinition = {
	id: "tiiny-host",
	name: "Tiiny Host",
	website: "https://tiiny.host",
	description: "Tiiny Host is a web hosting service for static sites with support for custom domains, SSL, password protection, and built-in analytics.",
	icon: "Tiiny Host.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "tiiny-host:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/\\/|\\.)tiiny\\.(?:host|site)\\/"),
			description: "Script source URL matches a known technology marker.",
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
