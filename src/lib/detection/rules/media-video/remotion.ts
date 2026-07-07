import type { TechnologyDefinition } from '../../types';

export const remotionTechnologyDefinition = {
	id: "remotion",
	name: "Remotion",
	website: "https://remotion.dev",
	description: "Remotion is a software tool that enables the creation of videos through React programming.",
	icon: "Remotion.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "remotion:jsGlobal:0",
			kind: "jsGlobal",
			property: "remotion_imported",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "remotion:jsGlobal:1",
			kind: "jsGlobal",
			property: "remotion_renderReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
