import type { TechnologyDefinition } from '../../types';

export const optimxSportsTechnologyDefinition = {
	id: "optimx-sports",
	name: "Optimx Sports",
	website: "https://optimxsports.com",
	description: "OptimX Sports is a platform that provides professional website designs for hockey, rugby, and lacrosse teams using a state-of-the-art creation system.",
	icon: "OptimxSports.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "optimx-sports:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/optimx-sports\\.appspot"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "optimx-sports:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpoptimx_sports_client_website",
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
