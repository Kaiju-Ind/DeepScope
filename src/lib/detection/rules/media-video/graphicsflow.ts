import type { TechnologyDefinition } from '../../types';

export const graphicsflowTechnologyDefinition = {
	id: "graphicsflow",
	name: "GraphicsFlow",
	website: "https://www.graphicsflow.com",
	description: "GraphicsFlow is an online tool that enables print shops to create, manage, and approve customer artwork.",
	icon: "GraphicsFlow.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "graphicsflow:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.graphicsflow.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "graphicsflow:header:1",
			kind: "header",
			key: "Set-Cookie",
			valuePattern: new RegExp("graphicsflowprodapi\\.azurewebsites\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "graphicsflow:header:2",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("graphicsflowprodapi\\.azurewebsites\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
