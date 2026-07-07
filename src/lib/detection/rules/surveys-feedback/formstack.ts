import type { TechnologyDefinition } from '../../types';

export const formstackTechnologyDefinition = {
	id: "formstack",
	name: "Formstack",
	website: "https://www.formstack.com",
	description: "Formstack is a platform offering no-code solutions for digital workflows, including forms, documents, and signatures.",
	icon: "Formstack.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formstack:dom:0",
			kind: "dom",
			selector: "form[action*='.formstack.com/forms']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "formstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "Formstack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "formstack:jsGlobal:2",
			kind: "jsGlobal",
			property: "loadFormstack",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
