import type { TechnologyDefinition } from '../../types';

export const rockrmsTechnologyDefinition = {
	id: "rockrms",
	name: "RockRMS",
	website: "https://www.rockrms.com",
	description: "Rock RMS is a free, open-source Relationship Management System (RMS) built for churches and businesses.",
	icon: "RockRMS.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
		"marketing-automation",
	],
	rules: [
		{
			id: "rockrms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Rock v([0-9.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rockrms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rock v([0-9.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:sparkdevnetwork:rock_rms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"iis",
		"microsoft-asp-net",
		"windows-server",
	],
} as const satisfies TechnologyDefinition;
