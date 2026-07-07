import type { TechnologyDefinition } from '../../types';

export const dimensionsAiTechnologyDefinition = {
	id: "dimensions-ai",
	name: "Dimensions AI",
	website: "https://www.dimensions.ai",
	description: "Dimensions AI is an advanced research database linking grants, publications, datasets, clinical trials, patents, and policy documents to support efficient translation from idea to impact.",
	icon: "Dimensions.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "dimensions-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dimensions\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dimensions-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "__dimensions_badge_config_loaded__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dimensions-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "__dimensions_badge_server",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
