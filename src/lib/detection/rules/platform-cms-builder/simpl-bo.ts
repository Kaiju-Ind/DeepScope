import type { TechnologyDefinition } from '../../types';

export const simplBoTechnologyDefinition = {
	id: "simpl-bo",
	name: "Simplébo",
	website: "https://www.simplebo.fr",
	description: "Simplébo is a French company that provides website creation and management services, including tools for building, hosting, and optimizing websites and ecommerce platforms.",
	icon: "Simplebo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simpl-bo:header:0",
			kind: "header",
			key: "X-ServedBy",
			valuePattern: new RegExp("simplebo", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "simpl-bo:header:1",
			kind: "header",
			key: "x-servedby",
			valuePattern: new RegExp("simplebo", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
