import type { TechnologyDefinition } from '../../types';

export const stackerhqTechnologyDefinition = {
	id: "stackerhq",
	name: "StackerHQ",
	website: "https://www.stackerhq.com",
	description: "StackerHQ is a tool in the low code platforms and application builders categories.",
	icon: "StackerHQ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stackerhq:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.stackerhq.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stackerhq:jsGlobal:1",
			kind: "jsGlobal",
			property: "stacker.install_feature",
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
