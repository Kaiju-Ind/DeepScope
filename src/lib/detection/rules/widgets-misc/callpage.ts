import type { TechnologyDefinition } from '../../types';

export const callpageTechnologyDefinition = {
	id: "callpage",
	name: "CallPage",
	website: "https://www.callpage.io",
	description: "CallPage is a lead capture tool that automatically schedules callbacks and meetings with potential customers, enhancing lead management efficiency.",
	icon: "CallPage.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "callpage:jsGlobal:0",
			kind: "jsGlobal",
			property: "callpage.__cp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "callpage:jsGlobal:1",
			kind: "jsGlobal",
			property: "callpage.__cp.version",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "callpage:jsGlobal:2",
			kind: "jsGlobal",
			property: "callpageWebpackJsonp",
			description: "Page-owned global matches a known technology marker.",
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
