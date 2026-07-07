import type { TechnologyDefinition } from '../../types';

export const pixiesetWebsiteTechnologyDefinition = {
	id: "pixieset-website",
	name: "Pixieset Website",
	website: "https://pixieset.com",
	description: "Pixieset Website is a space to create your own beautiful photography website.",
	icon: "Pixieset.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixieset-website:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Pixieset$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pixieset-website:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^pixieset$", "i"),
			description: "Meta tag matches a known technology marker.",
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
