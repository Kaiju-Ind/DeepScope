import type { TechnologyDefinition } from '../../types';

export const horoshopTechnologyDefinition = {
	id: "horoshop",
	name: "Horoshop",
	website: "https://horoshop.ua",
	description: "Horoshop is an all-in-one platform designed to support launching and managing online stores tailored for businesses in  Ukraine.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "horoshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "Horoshop.Widgets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "horoshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "horoshopReCaptcha",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "horoshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkHoroshop",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
