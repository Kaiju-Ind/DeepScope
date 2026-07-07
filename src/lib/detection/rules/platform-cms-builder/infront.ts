import type { TechnologyDefinition } from '../../types';

export const infrontTechnologyDefinition = {
	id: "infront",
	name: "Infront",
	website: "https://www.infront.sport",
	description: "Infront is a sports marketing company that specializes in the management, marketing, and distribution of sports media rights and events, providing services to sports federations, leagues, clubs, and media partners worldwide.",
	icon: "Infront.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "infront:dom:0",
			kind: "dom",
			selector: "#corebine-app",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "infront:jsGlobal:1",
			kind: "jsGlobal",
			property: "corebine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
