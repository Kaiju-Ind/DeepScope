import type { TechnologyDefinition } from '../../types';

export const vesticoTechnologyDefinition = {
	id: "vestico",
	name: "Vestico",
	website: "https://vestico.co",
	description: "Vestico is a digital asset management platform for organizing, managing, and distributing digital content.",
	icon: "Vestico.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vestico:jsGlobal:0",
			kind: "jsGlobal",
			property: "vesticoReportingDisabled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vestico:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_vestico_widget",
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
