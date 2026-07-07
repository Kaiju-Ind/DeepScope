import type { TechnologyDefinition } from '../../types';

export const piwikProCoreTechnologyDefinition = {
	id: "piwik-pro-core",
	name: "Piwik PRO Core",
	website: "https://piwik.pro",
	description: "Piwik PRO Core is a free alternative to Google Analytics that is privacy & compliance focused.",
	icon: "Piwik PRO Core.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "piwik-pro-core:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.piwik\\.pro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piwik-pro-core:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("piwik"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
	excludes: [
		"matomo-analytics",
	],
} as const satisfies TechnologyDefinition;
