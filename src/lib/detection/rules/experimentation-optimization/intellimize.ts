import type { TechnologyDefinition } from '../../types';

export const intellimizeTechnologyDefinition = {
	id: "intellimize",
	name: "Intellimize",
	website: "https://www.intellimize.com",
	description: "Intellimize is a platform that utilizes machine learning to optimize website experiences and increase conversions in real-time.",
	icon: "Intellimize.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "intellimize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.intellimize\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intellimize:jsGlobal:1",
			kind: "jsGlobal",
			property: "intellimize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
