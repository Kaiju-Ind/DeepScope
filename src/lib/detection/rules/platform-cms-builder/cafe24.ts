import type { TechnologyDefinition } from '../../types';

export const cafe24TechnologyDefinition = {
	id: "cafe24",
	name: "Cafe24",
	website: "https://www.cafe24.com/en/",
	description: "Cafe24 is a global ecommerce platform that provides everything people need to build an online DTC store in one stop.",
	icon: "Cafe24.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cafe24:jsGlobal:0",
			kind: "jsGlobal",
			property: "EC_GLOBAL_DATETIME",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cafe24:jsGlobal:1",
			kind: "jsGlobal",
			property: "EC_GLOBAL_INFO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cafe24:jsGlobal:2",
			kind: "jsGlobal",
			property: "EC_ROOT_DOMAIN",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
