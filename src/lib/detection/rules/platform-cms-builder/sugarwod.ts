import type { TechnologyDefinition } from '../../types';

export const sugarwodTechnologyDefinition = {
	id: "sugarwod",
	name: "SugarWOD",
	website: "https://www.sugarwod.com",
	description: "SugarWOD is a workout software for coaches and everyday athletes.",
	icon: "SugarWOD.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sugarwod:jsGlobal:0",
			kind: "jsGlobal",
			property: "SugarWOD.activeTracks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sugarwod:jsGlobal:1",
			kind: "jsGlobal",
			property: "SugarWODUtil.addAnimation",
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
