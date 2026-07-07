import type { TechnologyDefinition } from '../../types';

export const qformTechnologyDefinition = {
	id: "qform",
	name: "QForm",
	website: "https://qform.io",
	description: "QForm is a tool for designing and managing customizable forms for data collection and processing.",
	icon: "QForm.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "qform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.qform(?:24\\.com|\\.io)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
