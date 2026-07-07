import type { TechnologyDefinition } from '../../types';

export const subrionTechnologyDefinition = {
	id: "subrion",
	name: "Subrion",
	website: "https://subrion.com",
	icon: "Subrion.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "subrion:header:0",
			kind: "header",
			key: "X-Powered-CMS",
			valuePattern: new RegExp("Subrion CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "subrion:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Subrion ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "subrion:header:2",
			kind: "header",
			key: "x-powered-cms",
			valuePattern: new RegExp("subrion cms", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "subrion:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^subrion ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
