import type { TechnologyDefinition } from '../../types';

export const digiAccessTechnologyDefinition = {
	id: "digi-access",
	name: "digi·access",
	website: "https://www.digiaccess.org",
	description: "digi·access is a solution designed to improve web accessibility by helping organizations align digital content with WCAG 2.1 standards.",
	icon: "digiaccess.svg",
	categories: [
		"accessibility"
	],
	rules: [
		{
			id: "digi-access:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("download\\.digiaccess\\.org"),
			description: "Script source URL matches a known technology marker.",
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
