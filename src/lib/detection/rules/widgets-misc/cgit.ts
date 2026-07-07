import type { TechnologyDefinition } from '../../types';

export const cgitTechnologyDefinition = {
	id: "cgit",
	name: "cgit",
	website: "https://git.zx2c4.com/cgit",
	description: "cgit is a web interface (cgi) for Git repositories, written in C. licensed under GPLv2.",
	icon: "cgit.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "cgit:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^cgit v([\\d.a-z-]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"c",
		"git",
	],
} as const satisfies TechnologyDefinition;
