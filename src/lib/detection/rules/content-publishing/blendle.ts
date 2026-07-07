import type { TechnologyDefinition } from '../../types';

export const blendleTechnologyDefinition = {
	id: "blendle",
	name: "Blendle",
	website: "https://www.blendle.com",
	description: "Blendle is a digital magazine system that allows users to access and read articles from various publications.",
	icon: "Blendle.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "blendle:jsGlobal:0",
			kind: "jsGlobal",
			property: "asyncBlendleButtonInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blendle:jsGlobal:1",
			kind: "jsGlobal",
			property: "blendleButtonInit.locale",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
