import type { TechnologyDefinition } from '../../types';

export const booxiTechnologyDefinition = {
	id: "booxi",
	name: "Booxi",
	website: "https://www.booxi.com",
	description: "Booxi is a cloud-based appointment management platform for small to midsize businesses.",
	icon: "Booxi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "booxi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/bxe_core\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "booxi:jsGlobal:1",
			kind: "jsGlobal",
			property: "booxi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "booxi:jsGlobal:2",
			kind: "jsGlobal",
			property: "booxiController",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "booxi:jsGlobal:3",
			kind: "jsGlobal",
			property: "bxe_core",
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
