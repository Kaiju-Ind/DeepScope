import type { TechnologyDefinition } from '../../types';

export const gosuslugiTechnologyDefinition = {
	id: "gosuslugi",
	name: "Gosuslugi",
	website: "https://www.gosuslugi.ru",
	description: "Gosuslugi is a government-provided feedback widget that enables citizens to submit appeals and participate in polls directly on official agency websites through the Russian Public Services portal.",
	icon: "Gosuslugi.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "gosuslugi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pos\\.gosuslugi\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
