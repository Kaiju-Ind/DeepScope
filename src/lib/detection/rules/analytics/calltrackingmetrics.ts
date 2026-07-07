import type { TechnologyDefinition } from '../../types';

export const calltrackingmetricsTechnologyDefinition = {
	id: "calltrackingmetrics",
	name: "CallTrackingMetrics",
	website: "https://www.calltrackingmetrics.com",
	description: "CallTrackingMetrics is a call tracking and marketing attribution solution for contact centers and agencies.",
	icon: "CallTrackingMetrics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "calltrackingmetrics:jsGlobal:0",
			kind: "jsGlobal",
			property: "__ctm.numbers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "calltrackingmetrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "__ctm_tracked_numbers",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
