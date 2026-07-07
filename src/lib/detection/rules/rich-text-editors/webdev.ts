import type { TechnologyDefinition } from '../../types';

export const webdevTechnologyDefinition = {
	id: "webdev",
	name: "WEBDEV",
	website: "https://www.windev.com/webdev/index.html",
	description: "WEBDEV is a tool to develop internet and intranet sites and applications that support data and processes.",
	icon: "webdev.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "webdev:html:0",
			kind: "html",
			pattern: new RegExp("<!-- [a-zA-Z0-9_]+ [\\d/]+ [\\d:]+ WebDev \\d\\d ([\\d.]+) -->"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "webdev:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WEBDEV$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webdev:html:2",
			kind: "html",
			pattern: new RegExp("<!-- [a-za-z0-9_]+ [\\d/]+ [\\d:]+ webdev \\d\\d ([\\d.]+) -->"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "webdev:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webdev$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
