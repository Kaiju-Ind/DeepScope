import type { TechnologyDefinition } from '../../types';

export const olvyTechnologyDefinition = {
	id: "olvy",
	name: "Olvy",
	website: "https://olvy.co",
	description: "Olvy is a feedback management platform that enables user-centric teams to analyze insights, streamline product development, and keep stakeholders informed.",
	icon: "Olvy.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "olvy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.olvy\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "olvy:jsGlobal:1",
			kind: "jsGlobal",
			property: "OlvyConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "olvy:jsGlobal:2",
			kind: "jsGlobal",
			property: "OlvyInstances",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
