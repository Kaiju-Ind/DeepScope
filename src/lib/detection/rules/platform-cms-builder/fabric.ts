import type { TechnologyDefinition } from '../../types';

export const fabricTechnologyDefinition = {
	id: "fabric",
	name: "Fabric",
	website: "https://fabric.inc",
	description: "Fabric is a headless commerce platform helping direct-to-consumer and B2B brands utilize an ecommerce platform designed for their needs.",
	icon: "Fabric.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fabric:dom:0",
			kind: "dom",
			selector: "img[data-src*='fabric.imgix.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fabric:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("FabricInc", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fabric:meta:2",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("fabricinc", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
