import type { TechnologyDefinition } from '../../types';

export const woltersKluwerTechnologyDefinition = {
	id: "wolters-kluwer",
	name: "Wolters Kluwer",
	website: "https://www.cchwebsites.com",
	description: "Wolters Kluwer is a site builder designed for tax professionals to create and manage websites tailored to their practice needs.",
	icon: "WoltersKluwer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wolters-kluwer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.cchwebsites\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wolters-kluwer:meta:1",
			kind: "meta",
			key: "GENERATOR",
			valuePattern: new RegExp("^Designed by CCH Site Builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wolters-kluwer:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^designed by cch site builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
