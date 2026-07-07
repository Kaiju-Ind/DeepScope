import type { TechnologyDefinition } from '../../types';

export const unityTechnologyDefinition = {
	id: "unity",
	name: "Unity",
	website: "https://unity.com",
	description: "Unity is a gaming widget that enables the playing of games developed using 3D gaming engine.",
	icon: "Unity.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "unity:jsGlobal:0",
			kind: "jsGlobal",
			property: "UnityLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unity:jsGlobal:1",
			kind: "jsGlobal",
			property: "createUnityInstance",
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
