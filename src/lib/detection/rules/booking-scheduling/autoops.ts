import type { TechnologyDefinition } from '../../types';

export const autoopsTechnologyDefinition = {
	id: "autoops",
	name: "AutoOps",
	website: "https://www.autoops.com/",
	description: "AutoOps is an online scheduling tool that integrates with shop management softwares for auto shops.",
	icon: "AutoOps.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "autoops:jsGlobal:0",
			kind: "jsGlobal",
			property: "AutoOps.addSourceTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
