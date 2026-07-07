import type { TechnologyDefinition } from '../../types';

export const tryzensTechnologyDefinition = {
	id: "tryzens",
	name: "Tryzens",
	website: "https://tryzens.com",
	description: "Tryzens is a digital transformation specialist focused on implementing technology-driven strategies to improve business processes.",
	icon: "Tryzens.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "tryzens:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tryzens-analytics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tryzens:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.tryzens-analytics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
