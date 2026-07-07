import type { TechnologyDefinition } from '../../types';

export const livesiteTechnologyDefinition = {
	id: "livesite",
	name: "LiveSite",
	website: "https://livesite.com",
	description: "LiveSite is a professional website builder that enables users to create, manage, and publish websites.",
	icon: "LiveSite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "livesite:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^liveSite\\s+-\\s+https:\\/\\/livesite\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "livesite:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^livesite\\s+-\\s+https:\\/\\/livesite\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:livesite:livesite:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
