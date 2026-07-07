import type { TechnologyDefinition } from '../../types';

export const glassixTechnologyDefinition = {
	id: "glassix",
	name: "Glassix",
	website: "https://glassix.co.il",
	description: "Glassix is an omnichannel messaging platform for service, sales, and support centers.",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "glassix:jsGlobal:0",
			kind: "jsGlobal",
			property: "GlassixWidgetClient",
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
