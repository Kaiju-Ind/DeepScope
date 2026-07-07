import type { TechnologyDefinition } from '../../types';

export const overwolfTechnologyDefinition = {
	id: "overwolf",
	name: "Overwolf",
	website: "https://www.overwolf.com",
	description: "Overwolf is a platform that enables the creation, sharing, and monetization of in-game apps and mods.",
	icon: "Overwolf.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "overwolf:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("download\\.overwolf\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:overwolf:overwolf:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
