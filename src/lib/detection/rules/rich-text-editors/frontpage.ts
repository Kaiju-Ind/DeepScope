import type { TechnologyDefinition } from '../../types';

export const frontpageTechnologyDefinition = {
	id: "frontpage",
	name: "FrontPage",
	website: "https://office.microsoft.com/frontpage",
	description: "FrontPage is a program for developing and maintaining websites.",
	icon: "FrontPage.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "frontpage:meta:0",
			kind: "meta",
			key: "ProgId",
			valuePattern: new RegExp("^FrontPage\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "frontpage:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft FrontPage(?:\\s((?:Express )?[\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "frontpage:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft frontpage(?:\\s((?:express )?[\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "frontpage:meta:3",
			kind: "meta",
			key: "progid",
			valuePattern: new RegExp("^frontpage\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:frontpage:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
