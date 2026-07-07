import type { TechnologyDefinition } from '../../types';

export const uknowvaTechnologyDefinition = {
	id: "uknowva",
	name: "uKnowva",
	website: "https://uknowva.com",
	description: "uKnowva is a mobile-enabled HRMS software.",
	icon: "uKnowva.png",
	categories: [
		"platform-cms-builder",
		"community-ugc",
		"content-publishing",
		"business-tools",
	],
	rules: [
		{
			id: "uknowva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/media\\/conv\\/js\\/jquery\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uknowva:html:1",
			kind: "html",
			pattern: new RegExp("<a[^>]+>Powered by uKnowva<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "uknowva:header:2",
			kind: "header",
			key: "X-Content-Encoded-By",
			valuePattern: new RegExp("uKnowva ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "uknowva:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("uKnowva (?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "uknowva:html:4",
			kind: "html",
			pattern: new RegExp("<a[^>]+>powered by uknowva<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "uknowva:header:5",
			kind: "header",
			key: "x-content-encoded-by",
			valuePattern: new RegExp("uknowva ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "uknowva:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("uknowva (?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
