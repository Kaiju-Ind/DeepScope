import type { TechnologyDefinition } from '../../types';

export const salesbeatTechnologyDefinition = {
	id: "salesbeat",
	name: "Salesbeat",
	website: "https://salesbeat.pro",
	description: "Salesbeat is an ecommerce system that enhances online store performance by improving user engagement and purchase rates.",
	icon: "Salesbeat.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "salesbeat:jsGlobal:0",
			kind: "jsGlobal",
			property: "salesbeatBeganLoadingLock",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesbeat:jsGlobal:1",
			kind: "jsGlobal",
			property: "salesbeatTildaConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
