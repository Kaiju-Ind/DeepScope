import type { TechnologyDefinition } from '../../types';

export const meticularTechnologyDefinition = {
	id: "meticular",
	name: "Meticular",
	website: "https://www.metikular.ch",
	description: "Meticular is a Swiss platform that provides business solutions and services to support organizational operations.",
	icon: "Meticular.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "meticular:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.metikular\\.ch"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
