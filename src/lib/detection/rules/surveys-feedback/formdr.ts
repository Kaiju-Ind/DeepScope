import type { TechnologyDefinition } from '../../types';

export const formdrTechnologyDefinition = {
	id: "formdr",
	name: "FormDr",
	website: "https://formdr.com",
	description: "FormDr is a HIPAA-compliant platform providing secure online forms for collecting and managing sensitive healthcare information.",
	icon: "FormDr.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formdr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.formdr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "formdr:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.formdr.com']",
			description: "DOM selector matches a known technology marker.",
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
