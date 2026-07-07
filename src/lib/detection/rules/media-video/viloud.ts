import type { TechnologyDefinition } from '../../types';

export const viloudTechnologyDefinition = {
	id: "viloud",
	name: "Viloud",
	website: "https://viloud.tv",
	description: "Viloud is a platform that enables the creation of online TV channels for brands, allowing scheduled or on-demand content streaming.",
	icon: "Viloud.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "viloud:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.viloud\\.tv"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "viloud:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.viloud.tv/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
