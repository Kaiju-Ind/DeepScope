import type { TechnologyDefinition } from '../../types';

export const markerTechnologyDefinition = {
	id: "marker",
	name: "Marker",
	website: "https://marker.io",
	description: "Marker.io is an issue tracker solution for Project Managers, QA Testers and Agency Clients to report feedback & bugs to developers.",
	icon: "Marker.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "marker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("edge\\.marker\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marker:jsGlobal:1",
			kind: "jsGlobal",
			property: "markerConfig",
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
