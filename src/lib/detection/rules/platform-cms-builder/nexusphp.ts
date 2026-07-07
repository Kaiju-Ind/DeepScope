import type { TechnologyDefinition } from '../../types';

export const nexusphpTechnologyDefinition = {
	id: "nexusphp",
	name: "NexusPHP",
	website: "https://nexusphp.org",
	description: "NexusPHP is an open-sourced private tracker script written in PHP.",
	icon: "NexusPHP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nexusphp:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^NexusPHP$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nexusphp:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nexusphp$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:nexusphp:nexusphp:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
		"redis",
	],
} as const satisfies TechnologyDefinition;
