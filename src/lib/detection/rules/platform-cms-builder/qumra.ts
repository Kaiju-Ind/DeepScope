import type { TechnologyDefinition } from '../../types';

export const qumraTechnologyDefinition = {
	id: "qumra",
	name: "Qumra",
	website: "https://www.qumra.cloud",
	description: "Qumra is a platform that enables users to create ecommerce websites without requiring any programming knowledge.",
	icon: "Qumra.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "qumra:jsGlobal:0",
			kind: "jsGlobal",
			property: "Qumra.cart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qumra:jsGlobal:1",
			kind: "jsGlobal",
			property: "__qumra__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
