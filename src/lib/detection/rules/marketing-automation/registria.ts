import type { TechnologyDefinition } from '../../types';

export const registriaTechnologyDefinition = {
	id: "registria",
	name: "Registria",
	website: "https://www.registria.com",
	description: "Registria is a platform that enables durable product companies to engage with customers and deliver personalized experiences.",
	icon: "Registria.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "registria:jsGlobal:0",
			kind: "jsGlobal",
			property: "Registria.Cases",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "registria:jsGlobal:1",
			kind: "jsGlobal",
			property: "getRegistriaData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "registria:jsGlobal:2",
			kind: "jsGlobal",
			property: "getRegistriaDateData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
