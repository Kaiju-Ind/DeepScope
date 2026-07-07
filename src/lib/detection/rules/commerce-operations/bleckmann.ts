import type { TechnologyDefinition } from '../../types';

export const bleckmannTechnologyDefinition = {
	id: "bleckmann",
	name: "Bleckmann",
	website: "https://www.bleckmann.com",
	description: "Bleckmann is a logistics provider offering services to fashion and lifestyle brands, ensuring they meet customer delivery promises.",
	icon: "Bleckmann.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bleckmann:jsGlobal:0",
			kind: "jsGlobal",
			property: "API_BASE_URL_FE",
			valuePattern: new RegExp("\\.bleckmann\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bleckmann:jsGlobal:1",
			kind: "jsGlobal",
			property: "apiCall",
			valuePattern: new RegExp("\\.bleckmann\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
