import type { TechnologyDefinition } from '../../types';

export const imboxTechnologyDefinition = {
	id: "imbox",
	name: "ImBox",
	website: "https://imbox.se",
	description: "Imbox is a live chat platform that includes co-browsing features.",
	icon: "Imbox.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "imbox:jsGlobal:0",
			kind: "jsGlobal",
			property: "__IMBOX_GLOBAL__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "__IMBOX_INITIALIZED__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "_imbox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imbox:jsGlobal:3",
			kind: "jsGlobal",
			property: "imboxBuilt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imbox:jsGlobal:4",
			kind: "jsGlobal",
			property: "imboxManager",
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
