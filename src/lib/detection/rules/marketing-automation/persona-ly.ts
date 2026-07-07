import type { TechnologyDefinition } from '../../types';

export const personaLyTechnologyDefinition = {
	id: "persona-ly",
	name: "Persona.ly",
	website: "https://persona.ly",
	description: "Persona.ly is a data-driven platform that helps businesses acquire users through analytics and targeted strategies.",
	icon: "Persona.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "persona-ly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.persona\\.ly"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
