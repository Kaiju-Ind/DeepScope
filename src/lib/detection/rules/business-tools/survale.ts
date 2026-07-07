import type { TechnologyDefinition } from '../../types';

export const survaleTechnologyDefinition = {
	id: "survale",
	name: "Survale",
	website: "https://survale.com",
	description: "Survale is an employer satisfaction platform.",
	icon: "Survale.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "survale:jsGlobal:0",
			kind: "jsGlobal",
			property: "survale.add_event",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "survale:jsGlobal:1",
			kind: "jsGlobal",
			property: "survale_custom",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "survale:jsGlobal:2",
			kind: "jsGlobal",
			property: "survale_obj",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "survale:jsGlobal:3",
			kind: "jsGlobal",
			property: "survale_site_ids",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
