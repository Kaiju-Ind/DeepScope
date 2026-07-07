import type { TechnologyDefinition } from '../../types';

export const tablecheckTechnologyDefinition = {
	id: "tablecheck",
	name: "TableCheck",
	website: "https://www.tablecheck.com",
	description: "TableCheck is a restaurant table booking widget.",
	icon: "TableCheck.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tablecheck:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tc_widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tablecheck:dom:1",
			kind: "dom",
			selector: "form[action*='tablecheck']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
