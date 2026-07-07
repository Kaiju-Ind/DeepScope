import type { TechnologyDefinition } from '../../types';

export const webeditionTechnologyDefinition = {
	id: "webedition",
	name: "webEdition",
	website: "https://webedition.de/en",
	icon: "webEdition.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webedition:meta:0",
			kind: "meta",
			key: "DC.title",
			valuePattern: new RegExp("webEdition", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webedition:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("webEdition", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webedition:meta:2",
			kind: "meta",
			key: "dc.title",
			valuePattern: new RegExp("webedition", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webedition:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("webedition", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:webedition:webedition_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
