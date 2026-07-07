import type { TechnologyDefinition } from '../../types';

export const formIoTechnologyDefinition = {
	id: "form-io",
	name: "Form.io",
	website: "https://form.io",
	description: "Form.io is a platform for designing, managing, and converting forms and data within applications.",
	icon: "FormIO.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "form-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.form\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "form-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "Formio.Form",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "form-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "FormioUtils",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:form:form.io:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
