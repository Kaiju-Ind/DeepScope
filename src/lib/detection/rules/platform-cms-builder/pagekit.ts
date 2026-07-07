import type { TechnologyDefinition } from '../../types';

export const pagekitTechnologyDefinition = {
	id: "pagekit",
	name: "Pagekit",
	website: "https://pagekit.com",
	icon: "Pagekit.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagekit:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Pagekit", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pagekit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("pagekit", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:pagekit:pagekit:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
