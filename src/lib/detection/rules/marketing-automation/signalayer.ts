import type { TechnologyDefinition } from '../../types';

export const signalayerTechnologyDefinition = {
	id: "signalayer",
	name: "Signalayer",
	website: "https://signalayer.com",
	description: "Signalayer is a provider of digital marketing solutions designed to support brands and agencies in enhancing their online presence.",
	icon: "Signalayer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "signalayer:jsGlobal:0",
			kind: "jsGlobal",
			property: "Signalayer.API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "signalayer:jsGlobal:1",
			kind: "jsGlobal",
			property: "signalayerApiKey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
