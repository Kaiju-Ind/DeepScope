import type { TechnologyDefinition } from '../../types';

export const sCorepionTechnologyDefinition = {
	id: "s-corepion",
	name: "S-COREpion",
	website: "https://s-corepion.ru",
	description: "S-COREpion is a PHP and MySQL-based content management system (CMS) used for creating and managing websites and web applications.",
	icon: "S-COREpion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "s-corepion:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^S-COREpion CMS$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "s-corepion:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^s-corepion cms$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
