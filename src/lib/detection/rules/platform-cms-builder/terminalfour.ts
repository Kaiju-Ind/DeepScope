import type { TechnologyDefinition } from '../../types';

export const terminalfourTechnologyDefinition = {
	id: "terminalfour",
	name: "Terminalfour",
	website: "https://www.terminalfour.com",
	description: "Terminalfour is a digital engagement and web content management platform for higher education.",
	icon: "Terminalfour.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "terminalfour:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("TERMINALFOUR", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "terminalfour:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("terminalfour", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:terminalfour:terminalfour:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
