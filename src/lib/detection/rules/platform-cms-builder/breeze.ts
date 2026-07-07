import type { TechnologyDefinition } from '../../types';

export const breezeTechnologyDefinition = {
	id: "breeze",
	name: "Breeze",
	website: "https://breezefront.com",
	description: "Breeze is an open-source frontend framework designed for Magento.",
	icon: "Breeze.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "breeze:jsGlobal:0",
			kind: "jsGlobal",
			property: "breeze.getScopeId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
