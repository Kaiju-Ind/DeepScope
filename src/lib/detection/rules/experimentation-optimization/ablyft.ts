import type { TechnologyDefinition } from '../../types';

export const ablyftTechnologyDefinition = {
	id: "ablyft",
	name: "ABLyft",
	website: "https://ablyft.com",
	description: "ABlyft is an A/B-Testing Platform made for developers.",
	icon: "ABlyft.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ablyft:jsGlobal:0",
			kind: "jsGlobal",
			property: "ablyft.get",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ablyft:jsGlobal:1",
			kind: "jsGlobal",
			property: "ablyftClickListener",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ablyft:jsGlobal:2",
			kind: "jsGlobal",
			property: "ablyftEventQueueInterv",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ablyft:jsGlobal:3",
			kind: "jsGlobal",
			property: "ablyftStopQueue",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
