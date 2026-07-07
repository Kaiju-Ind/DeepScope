import type { TechnologyDefinition } from '../../types';

export const snewsTechnologyDefinition = {
	id: "snews",
	name: "sNews",
	website: "https://snewscms.com",
	icon: "sNews.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "snews:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sNews", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "snews:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("snews", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:snewscms:snews:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
