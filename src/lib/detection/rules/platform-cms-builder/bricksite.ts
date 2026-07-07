import type { TechnologyDefinition } from '../../types';

export const bricksiteTechnologyDefinition = {
	id: "bricksite",
	name: "Bricksite",
	website: "https://bricksite.io",
	description: "Bricksite is a free website online tool where clients can create free accounts with various themes and features.",
	icon: "Bricksite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bricksite:jsGlobal:0",
			kind: "jsGlobal",
			property: "brickSite.common.apiUrls.base",
			valuePattern: new RegExp("\\.bricksite\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bricksite:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Bricksite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bricksite:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^bricksite$", "i"),
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
