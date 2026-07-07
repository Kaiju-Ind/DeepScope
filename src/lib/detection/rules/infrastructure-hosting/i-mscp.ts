import type { TechnologyDefinition } from '../../types';

export const iMscpTechnologyDefinition = {
	id: "i-mscp",
	name: "i-MSCP",
	website: "https://github.com/i-MSCP/imscp",
	description: "i-MSCP (internet Multi Server Control Panel) is a software for shared hosting environments management on Linux servers.",
	icon: "i-MSCP.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "i-mscp:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^i-MSCP$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "i-mscp:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^i-mscp$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
