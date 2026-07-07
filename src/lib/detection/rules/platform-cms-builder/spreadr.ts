import type { TechnologyDefinition } from '../../types';

export const spreadrTechnologyDefinition = {
	id: "spreadr",
	name: "Spreadr",
	website: "https://spreadr.co",
	description: "Spreadr is a tool that imports complementary products from Amazon into an online store.",
	icon: "Spreadr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spreadr:jsGlobal:0",
			kind: "jsGlobal",
			property: "spreadrCode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spreadr:jsGlobal:1",
			kind: "jsGlobal",
			property: "spreadrmsieversion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
