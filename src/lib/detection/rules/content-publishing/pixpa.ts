import type { TechnologyDefinition } from '../../types';

export const pixpaTechnologyDefinition = {
	id: "pixpa",
	name: "Pixpa",
	website: "https://www.pixpa.com",
	description: "Pixpa is a software that enables photographers, artists and creative designers build and manage online presence by letting them create a professional portfolio website without the need of any coding skills.",
	icon: "Pixpa.svg",
	categories: [
		"content-publishing",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixpa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themeassets\\.pixpa\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
