import type { TechnologyDefinition } from '../../types';

export const formrunTechnologyDefinition = {
	id: "formrun",
	name: "Formrun",
	website: "https://form.run",
	description: "Formrun is a form creation tool.",
	icon: "Formrun.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formrun:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.form\\.run"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formrun:jsGlobal:1",
			kind: "jsGlobal",
			property: "Formrun.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
