import type { TechnologyDefinition } from '../../types';

export const ucalcTechnologyDefinition = {
	id: "ucalc",
	name: "Ucalc",
	website: "https://ucalc.pro",
	description: "Ucalc is a platform offering calculators and form building tools, facilitating efficient computation and streamlined data collection processes.",
	icon: "Ucalc.svg",
	categories: [
		"widgets-misc",
		"surveys-feedback",
	],
	rules: [
		{
			id: "ucalc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ucalc\\.pro\\/api\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ucalc:jsGlobal:1",
			kind: "jsGlobal",
			property: "uCalc",
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
