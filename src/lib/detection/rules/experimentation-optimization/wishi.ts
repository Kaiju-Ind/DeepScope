import type { TechnologyDefinition } from '../../types';

export const wishiTechnologyDefinition = {
	id: "wishi",
	name: "Wishi",
	website: "https://wishi.me",
	description: "Wishi is a curation and personalization platform that enhances online sales by providing embedded personal styling at scale.",
	icon: "Wishi.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "wishi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.wishi\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "wishi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Wishi.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wishi:jsGlobal:2",
			kind: "jsGlobal",
			property: "WishiAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wishi:jsGlobal:3",
			kind: "jsGlobal",
			property: "WishiSDKVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
