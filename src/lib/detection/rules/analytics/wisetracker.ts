import type { TechnologyDefinition } from '../../types';

export const wisetrackerTechnologyDefinition = {
	id: "wisetracker",
	name: "Wisetracker",
	website: "https://www.wisetracker.co.kr",
	description: "Wisetracker is a behavioral analytics and marketing automation tool.",
	icon: "Wisetracker.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "wisetracker:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.wisetracker\\.co\\.kr"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "wisetracker:jsGlobal:1",
			kind: "jsGlobal",
			property: "DOP_SDK_CONF.adClkEndPoint",
			valuePattern: new RegExp("\\.analytics\\.wisetracker\\.co\\.kr"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wisetracker:jsGlobal:2",
			kind: "jsGlobal",
			property: "DOT_ADCLK_ENDPOINT",
			valuePattern: new RegExp("\\.analytics\\.wisetracker\\.co\\.kr"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
