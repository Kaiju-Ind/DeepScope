import type { TechnologyDefinition } from '../../types';

export const percussionTechnologyDefinition = {
	id: "percussion",
	name: "Percussion",
	website: "https://percussion.com",
	icon: "Percussion.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "percussion:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+class=\"perc-region\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "percussion:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:Percussion|Rhythmyx)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "percussion:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:percussion|rhythmyx)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
