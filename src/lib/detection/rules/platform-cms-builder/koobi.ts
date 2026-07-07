import type { TechnologyDefinition } from '../../types';

export const koobiTechnologyDefinition = {
	id: "koobi",
	name: "Koobi",
	website: "https://dream4.de/cms",
	icon: "Koobi.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "koobi:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^K>-]+Koobi ([a-z\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koobi:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Koobi", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "koobi:html:2",
			kind: "html",
			pattern: new RegExp("<!--[^k>-]+koobi ([a-z\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koobi:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("koobi", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
