import type { TechnologyDefinition } from '../../types';

export const leadConceptTechnologyDefinition = {
	id: "lead-concept",
	name: "Lead Concept",
	website: "https://www.lead-concept.com",
	description: "Lead Concept is a system designed to generate potential customer leads.",
	icon: "LeadConcept.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lead-concept:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.lead-concept\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
