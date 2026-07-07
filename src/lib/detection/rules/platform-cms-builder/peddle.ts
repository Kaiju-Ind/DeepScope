import type { TechnologyDefinition } from '../../types';

export const peddleTechnologyDefinition = {
	id: "peddle",
	name: "Peddle",
	website: "https://www.peddle.com",
	description: "Peddle is a platform offering instant cash offers for cars, streamlining the selling process.",
	icon: "Peddle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "peddle:jsGlobal:0",
			kind: "jsGlobal",
			property: "PeddlePublisherEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "peddle:jsGlobal:1",
			kind: "jsGlobal",
			property: "PeddlePublisherEmbedConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
