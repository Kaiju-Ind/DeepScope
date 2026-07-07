import type { TechnologyDefinition } from '../../types';

export const renderTechnologyDefinition = {
	id: "render",
	name: "Render",
	website: "https://render.com",
	description: "Render is a cloud computing platform that provides a wide range of services, including web hosting, cloud computing, and application development. Render offers several hosting options, including static site hosting, web application hosting, and managed databases.",
	icon: "Render.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "render:header:0",
			kind: "header",
			key: "x-render-origin-server",
			valuePattern: new RegExp("Render", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "render:header:1",
			kind: "header",
			key: "x-render-origin-server",
			valuePattern: new RegExp("render", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
