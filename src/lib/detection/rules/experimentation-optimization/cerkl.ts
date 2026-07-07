import type { TechnologyDefinition } from '../../types';

export const cerklTechnologyDefinition = {
	id: "cerkl",
	name: "Cerkl",
	website: "https://cerkl.com",
	description: "Cerkl is an internal communication software designed to support organizations of any size or structure.",
	icon: "Cerkl.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "cerkl:jsGlobal:0",
			kind: "jsGlobal",
			property: "cerklAptly",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cerkl:jsGlobal:1",
			kind: "jsGlobal",
			property: "cerkl_awp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cerkl:jsGlobal:2",
			kind: "jsGlobal",
			property: "cerkl_subscribe_box",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
