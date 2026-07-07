import type { TechnologyDefinition } from '../../types';

export const voximplantTechnologyDefinition = {
	id: "voximplant",
	name: "Voximplant",
	website: "https://voximplant.com/products/click-to-call",
	description: "Voximplant is a cloud-based communication platform that enables voice calls directly from a webpage using a computer, formerly known as Zingaya.",
	icon: "Voximplant.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "voximplant:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("zingaya\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "voximplant:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zingaya.analytics_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "voximplant:jsGlobal:2",
			kind: "jsGlobal",
			property: "ZingayaClass",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
