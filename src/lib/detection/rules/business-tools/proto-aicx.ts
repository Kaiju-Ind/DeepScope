import type { TechnologyDefinition } from '../../types';

export const protoAicxTechnologyDefinition = {
	id: "proto-aicx",
	name: "Proto AICX",
	website: "https://www.proto.cx",
	description: "Proto AICX is a provider of inclusive CX automation and multilingual contact center solutions, enabling deployment of AI chatbots, live chat, ticketing systems, and CRM for businesses and governments.",
	icon: "ProtoAICX.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "proto-aicx:jsGlobal:0",
			kind: "jsGlobal",
			property: "Proto.close",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proto-aicx:jsGlobal:1",
			kind: "jsGlobal",
			property: "protoSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
