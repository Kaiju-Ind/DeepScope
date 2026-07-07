import type { TechnologyDefinition } from '../../types';

export const trustifyTechnologyDefinition = {
	id: "trustify",
	name: "Trustify",
	website: "https://trustify.ch",
	description: "Trustify is a platform that collects and generates customer reviews while offering marketing tools to support businesses.",
	icon: "Trustify.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.trustify\\.ch"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "trustify:jsGlobal:1",
			kind: "jsGlobal",
			property: "badgeGetTrustifyBadgeData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustify:jsGlobal:2",
			kind: "jsGlobal",
			property: "initTrustifyBadge",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
