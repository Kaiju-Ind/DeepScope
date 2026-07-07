import type { TechnologyDefinition } from '../../types';

export const mokaHrTechnologyDefinition = {
	id: "moka-hr",
	name: "Moka HR",
	website: "https://mokahr.com",
	description: "Moka HR is an AI-driven human resources management system offering full-module support for streamlined employee administration.",
	icon: "Moka.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "moka-hr:jsGlobal:0",
			kind: "jsGlobal",
			property: "MOKA_RETRY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moka-hr:jsGlobal:1",
			kind: "jsGlobal",
			property: "_MOKA_ENV_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moka-hr:jsGlobal:2",
			kind: "jsGlobal",
			property: "__moka__extension__kit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
