import type { TechnologyDefinition } from '../../types';

export const solutionreachTechnologyDefinition = {
	id: "solutionreach",
	name: "SolutionReach",
	website: "https://www.solutionreach.com",
	description: "SolutionReach is a patient engagement and retention platform that helps healthcare providers maintain contact with patients from initial appointment through final payment.",
	icon: "SolutionReach.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "solutionreach:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.solutionreach\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solutionreach:dom:1",
			kind: "dom",
			selector: "iframe[src*='.solutionreach.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
