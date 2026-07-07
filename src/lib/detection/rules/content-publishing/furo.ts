import type { TechnologyDefinition } from '../../types';

export const furoTechnologyDefinition = {
	id: "furo",
	name: "Furo",
	website: "https://pradyunsg.me/furo",
	description: "Furo is a customizable Sphinx documentation theme designed to provide a clean, responsive, and user-friendly layout for technical and project documentation.",
	icon: "Furo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "furo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\/scripts\\/furo\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
