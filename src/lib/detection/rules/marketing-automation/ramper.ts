import type { TechnologyDefinition } from '../../types';

export const ramperTechnologyDefinition = {
	id: "ramper",
	name: "Ramper",
	website: "https://ramper.com.br",
	description: "Ramper is a B2B marketing and sales platform designed to streamline business operations.",
	icon: "Ramper.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ramper:jsGlobal:0",
			kind: "jsGlobal",
			property: "LaharApp.criacao_elementos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ramper:jsGlobal:1",
			kind: "jsGlobal",
			property: "PopupLahar.create",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ramper:jsGlobal:2",
			kind: "jsGlobal",
			property: "SourceLahar.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ramper:jsGlobal:3",
			kind: "jsGlobal",
			property: "TrackingLahar.create",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
