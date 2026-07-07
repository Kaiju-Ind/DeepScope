import type { TechnologyDefinition } from '../../types';

export const optinmonsterTechnologyDefinition = {
	id: "optinmonster",
	name: "OptinMonster",
	website: "https://optinmonster.com",
	description: "OptinMonster is a conversion optimisation tool that allows you to grow your email list.",
	icon: "OptinMonster.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "optinmonster:jsGlobal:0",
			kind: "jsGlobal",
			property: "OptinMonsterApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
