import type { TechnologyDefinition } from '../../types';

export const qualitandoTechnologyDefinition = {
	id: "qualitando",
	name: "Qualitando",
	website: "https://www.qualitando.com",
	description: "Qualitando is an Italian customer satisfaction widget designed to collect, measure, and analyze user feedback to support service quality evaluation and improvement.",
	icon: "Qualitando.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "qualitando:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qualitando\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qualitando:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.qualitando\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
