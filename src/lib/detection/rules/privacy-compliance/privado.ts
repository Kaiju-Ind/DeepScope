import type { TechnologyDefinition } from '../../types';

export const privadoTechnologyDefinition = {
	id: "privado",
	name: "Privado",
	website: "https://www.privado.ai",
	description: "Privado is a privacy management platform that automates data mapping.",
	icon: "Privado.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "privado:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cdn\\.privado\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
