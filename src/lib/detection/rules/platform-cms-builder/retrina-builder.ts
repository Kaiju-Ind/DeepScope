import type { TechnologyDefinition } from '../../types';

export const retrinaBuilderTechnologyDefinition = {
	id: "retrina-builder",
	name: "Retrina Builder",
	website: "https://retrina.com/ronixa-product",
	description: "Retrina Builder is a drag-and-drop page builder for OpenCart that enables website creation without requiring coding skills.",
	icon: "RetrinaBuilder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "retrina-builder:dom:0",
			kind: "dom",
			selector: "link[href*='/retrina-builder.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "retrina-builder:dom:1",
			kind: "dom",
			selector: "link[href*='/retrina_builder_custom.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "retrina-builder:dom:2",
			kind: "dom",
			selector: "link[href*='/retrina-builder.min.css'], link[href*='/retrina_builder_custom.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
