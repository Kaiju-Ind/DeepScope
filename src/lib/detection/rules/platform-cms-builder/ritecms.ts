import type { TechnologyDefinition } from '../../types';

export const ritecmsTechnologyDefinition = {
	id: "ritecms",
	name: "RiteCMS",
	website: "https://ritecms.com",
	icon: "RiteCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ritecms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^RiteCMS(?: (.+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ritecms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ritecms(?: (.+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ritecms:ritecms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
		"sqlite-confidence-80",
	],
} as const satisfies TechnologyDefinition;
