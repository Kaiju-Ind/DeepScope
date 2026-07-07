import type { TechnologyDefinition } from '../../types';

export const gomagTechnologyDefinition = {
	id: "gomag",
	name: "Gomag",
	website: "https://www.gomag.ro",
	description: "Gomag is a B2B and B2C ecommerce platform from Romania.",
	icon: "Gomag.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gomag:jsGlobal:0",
			kind: "jsGlobal",
			property: "$GomagConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomag:jsGlobal:1",
			kind: "jsGlobal",
			property: "GomagForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gomag:header:2",
			kind: "header",
			key: "author",
			valuePattern: new RegExp("^Gomag$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gomag:header:3",
			kind: "header",
			key: "author",
			valuePattern: new RegExp("^gomag$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
