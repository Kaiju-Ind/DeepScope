import type { TechnologyDefinition } from '../../types';

export const formesterTechnologyDefinition = {
	id: "formester",
	name: "Formester",
	website: "https://formester.com",
	description: "Formester is a platform for creating interactive forms with AI, supporting logic jumps and automation without requiring coding.",
	icon: "Formester.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formester:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.formester\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "formester:dom:1",
			kind: "dom",
			selector: "form[action*='app.formester.com'], iframe[src*='app.formester.com']",
			description: "DOM selector matches a known technology marker.",
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
