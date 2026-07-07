import type { TechnologyDefinition } from '../../types';

export const zenmaidTechnologyDefinition = {
	id: "zenmaid",
	name: "ZenMaid",
	website: "https://get.zenmaid.com",
	description: "ZenMaid is a residential cleaning scheduling software that helps manage appointments.",
	icon: "ZenMaid.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zenmaid:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.zenmaid\\.com"),
			description: "Script content contains a bounded technology signature.",
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
