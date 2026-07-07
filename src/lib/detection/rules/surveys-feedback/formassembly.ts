import type { TechnologyDefinition } from '../../types';

export const formassemblyTechnologyDefinition = {
	id: "formassembly",
	name: "FormAssembly",
	website: "https://www.formassembly.com",
	description: "FormAssembly is a platform that enables to collection of data and processing via workflow.",
	icon: "FormAssembly.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formassembly:dom:0",
			kind: "dom",
			selector: "form[action*='tfaforms.net'], iframe[src*='tfaforms.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "formassembly:jsGlobal:1",
			kind: "jsGlobal",
			property: "wFORMS.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
