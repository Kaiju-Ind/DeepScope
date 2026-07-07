import type { TechnologyDefinition } from '../../types';

export const flexcmpTechnologyDefinition = {
	id: "flexcmp",
	name: "FlexCMP",
	website: "https://www.flexcmp.com/cms/home",
	description: "FlexCMP is a content management system (CMS) designed to facilitate the creation, management, and publishing of digital content.",
	icon: "FlexCMP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flexcmp:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+FlexCMP[^>v]+v\\. ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "flexcmp:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("FlexCMP.+\\[v\\. ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "flexcmp:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^FlexCMP", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "flexcmp:html:3",
			kind: "html",
			pattern: new RegExp("<!--[^>]+flexcmp[^>v]+v\\. ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "flexcmp:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("flexcmp.+\\[v\\. ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "flexcmp:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^flexcmp", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
