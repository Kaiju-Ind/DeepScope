import type { TechnologyDefinition } from '../../types';

export const teambrainTechnologyDefinition = {
	id: "teambrain",
	name: "TeamBrain",
	website: "https://www.teambrain.io",
	description: "TeamBrain is a knowledge management solution that allows users to use a self-learning dynamic FAQ on a website or widget on the bottom right of any page.",
	icon: "TeamBrain.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "teambrain:dom:0",
			kind: "dom",
			selector: "link[href*='//teambrain.app/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "teambrain:jsGlobal:1",
			kind: "jsGlobal",
			property: "TeamBrainExternalApp",
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
