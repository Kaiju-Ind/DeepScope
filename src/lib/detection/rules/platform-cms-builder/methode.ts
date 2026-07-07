import type { TechnologyDefinition } from '../../types';

export const methodeTechnologyDefinition = {
	id: "methode",
	name: "Methode",
	website: "https://www.eidosmedia.com/",
	icon: "Methode.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "methode:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Methode uuid: \"[a-f\\d]+\" ?-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "methode:meta:1",
			kind: "meta",
			key: "eomportal-id",
			valuePattern: new RegExp("\\d+", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "methode:meta:2",
			kind: "meta",
			key: "eomportal-instanceid",
			valuePattern: new RegExp("\\d+", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "methode:meta:3",
			kind: "meta",
			key: "eomportal-loid",
			valuePattern: new RegExp("[\\d.]+", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "methode:meta:4",
			kind: "meta",
			key: "eomportal-uuid",
			valuePattern: new RegExp("[a-f\\d]+", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "methode:html:5",
			kind: "html",
			pattern: new RegExp("<!-- methode uuid: \"[a-f\\d]+\" ?-->"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
