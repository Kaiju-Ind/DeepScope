import type { TechnologyDefinition } from '../../types';

export const biskouiTechnologyDefinition = {
	id: "biskoui",
	name: "biskoui",
	website: "https://biskoui.ch",
	description: "biskoui is a Swiss platform designed to manage digital consent across services and technologies beyond traditional cookie-based methods.",
	icon: "biskoui.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "biskoui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.biskoui\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "biskoui:jsGlobal:1",
			kind: "jsGlobal",
			property: "biskouiScriptLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "biskoui:jsGlobal:2",
			kind: "jsGlobal",
			property: "biskouiSettings",
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
