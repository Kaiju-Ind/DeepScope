import type { TechnologyDefinition } from '../../types';

export const peckadesignPublicatorTechnologyDefinition = {
	id: "peckadesign-publicator",
	name: "PeckaDesign Publicator",
	website: "https://www.peckadesign.cz/publicator",
	description: "PeckaDesign Publicator is a headless ecommerce platform designed for large online stores, offering high performance, scalability, and security while enabling tailored modifications to meet specific business needs.",
	icon: "PeckaDesignPublicator.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "peckadesign-publicator:meta:0",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("PeckaDesign", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "peckadesign-publicator:meta:1",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("peckadesign", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
