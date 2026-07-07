import type { TechnologyDefinition } from '../../types';

export const gerritTechnologyDefinition = {
	id: "gerrit",
	name: "Gerrit",
	website: "https://www.gerritcodereview.com",
	description: "Gerrit is a web-based code review system for Git repositories.",
	icon: "gerrit.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gerrit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^gerrit_ui\\/gerrit_ui"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gerrit:html:1",
			kind: "html",
			pattern: new RegExp(">Gerrit Code Review<\\/a>\\s*\"\\s*\\(([0-9.]+)\\)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gerrit:html:2",
			kind: "html",
			pattern: new RegExp("<(?:div|style) id=\"gerrit_"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gerrit:jsGlobal:3",
			kind: "jsGlobal",
			property: "Gerrit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gerrit:jsGlobal:4",
			kind: "jsGlobal",
			property: "gerrit_ui",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gerrit:meta:5",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^Gerrit Code Review$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gerrit:html:6",
			kind: "html",
			pattern: new RegExp(">gerrit code review<\\/a>\\s*\"\\s*\\(([0-9.]+)\\)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gerrit:meta:7",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^gerrit code review$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:google:gerrit:*:*:*:*:*:*:*:*",
	},
	implies: [
		"git",
		"java",
	],
} as const satisfies TechnologyDefinition;
