import type { TechnologyDefinition } from '../../types';

export const gravTechnologyDefinition = {
	id: "grav",
	name: "Grav",
	website: "https://getgrav.org",
	description: "Grav is a modern, open-source flat-file CMS designed for speed and flexibility, enabling easy website creation and management without needing a database.",
	icon: "Grav.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "grav:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("GravCMS(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "grav:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("gravcms(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:getgrav:grav_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
