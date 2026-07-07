import type { TechnologyDefinition } from '../../types';

export const direktonlineTechnologyDefinition = {
	id: "direktonline",
	name: "Direktonline",
	website: "https://direktonline.se",
	description: "Direktonline is a Swedish enterprise ecommerce designer specializing in creating scalable digital storefronts and tailored online shopping solutions for large businesses.",
	icon: "Direktonline.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "direktonline:meta:0",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("^DirektOnline Bliss Webbstudio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "direktonline:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^direktonline bliss webbstudio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
