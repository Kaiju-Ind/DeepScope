import type { TechnologyDefinition } from '../../types';

export const happyornotTechnologyDefinition = {
	id: "happyornot",
	name: "HappyOrNot",
	website: "https://www.happy-or-not.com",
	description: "HappyOrNot is a feedback system that collects and analyzes customer and employee satisfaction data to measure experience and inform service improvements.",
	icon: "HappyOrNot.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "happyornot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("feedback\\.happy-or-not\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
