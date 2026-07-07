import type { TechnologyDefinition } from '../../types';

export const wfolioTechnologyDefinition = {
	id: "wfolio",
	name: "Wfolio",
	website: "https://wfolio.com",
	description: "Wfolio is an online solution designed to help photographers showcase their work and grow their business.",
	icon: "Wfolio.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "wfolio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.wfolio\\.pro"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "wfolio:jsGlobal:1",
			kind: "jsGlobal",
			property: "initWfolioCard",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
