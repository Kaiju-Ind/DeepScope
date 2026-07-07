import type { TechnologyDefinition } from '../../types';

export const selligentTechnologyDefinition = {
	id: "selligent",
	name: "Selligent",
	website: "https://meetmarigold.com/solutions/messaging/selligent",
	description: "Selligent is a data-driven, multi-channel marketing tool that enables organizations to manage, execute, and analyze customer engagement campaigns across multiple digital communication channels.",
	icon: "Selligent.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "selligent:jsGlobal:0",
			kind: "jsGlobal",
			property: "selligentClearCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "selligent:jsGlobal:1",
			kind: "jsGlobal",
			property: "selligentEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
