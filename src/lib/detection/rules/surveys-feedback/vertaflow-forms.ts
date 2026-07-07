import type { TechnologyDefinition } from '../../types';

export const vertaflowFormsTechnologyDefinition = {
	id: "vertaflow-forms",
	name: "VertaFlow Forms",
	website: "https://vertaflow.io",
	description: "VertaFlow Forms is an embeddable lead-capture form widget that routes submissions to VertaFlow CRM.",
	icon: "VertaFlow.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "vertaflow-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vertaflow\\.io\\/v1\\/form\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
