import type { TechnologyDefinition } from '../../types';

export const pickaxeTechnologyDefinition = {
	id: "pickaxe",
	name: "Pickaxe",
	website: "https://pickaxe.co",
	description: "Pickaxe is a no-code platform that enables users to build, launch, and sell AI products without requiring coding skills.",
	icon: "Pickaxe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pickaxe:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("embed\\.pickaxeproject\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "pickaxe:jsGlobal:1",
			kind: "jsGlobal",
			property: "PICKAXE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pickaxe:jsGlobal:2",
			kind: "jsGlobal",
			property: "PickaxeProject",
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
