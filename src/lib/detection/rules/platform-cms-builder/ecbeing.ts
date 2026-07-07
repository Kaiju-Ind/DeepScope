import type { TechnologyDefinition } from '../../types';

export const ecbeingTechnologyDefinition = {
	id: "ecbeing",
	name: "ecbeing",
	website: "https://www.ecbeing.net",
	description: "Ecbeing is a platform designed for building ecommerce sites, tailored for medium-sized and large companies.",
	icon: "Ecbeing.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecbeing:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.ecbeing\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "ecbeing:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("ecbn-selection-widget\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "ecbeing:dom:2",
			kind: "dom",
			selector: "div[class^='ecbn-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ecbeing:jsGlobal:3",
			kind: "jsGlobal",
			property: "ecUtil",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ecbeing:jsGlobal:4",
			kind: "jsGlobal",
			property: "ecblib",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
