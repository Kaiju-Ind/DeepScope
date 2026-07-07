import type { TechnologyDefinition } from '../../types';

export const makerTechnologyDefinition = {
	id: "maker",
	name: "Maker",
	website: "https://www.maker.co",
	description: "Maker is a platform that enables the creation, management, and optimization of ecommerce content without requiring coding knowledge.",
	icon: "Maker.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maker:jsGlobal:0",
			kind: "jsGlobal",
			property: "MakerEmbeds.run",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maker:jsGlobal:1",
			kind: "jsGlobal",
			property: "MakerEnhance",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maker:jsGlobal:2",
			kind: "jsGlobal",
			property: "MakerEnhanceEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maker:jsGlobal:3",
			kind: "jsGlobal",
			property: "MakerExperiment",
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
