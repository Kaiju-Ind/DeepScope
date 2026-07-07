import type { TechnologyDefinition } from '../../types';

export const mobicredTechnologyDefinition = {
	id: "mobicred",
	name: "mobicred",
	website: "https://mobicred.co.za/",
	description: "Mobicred is a credit facility that allows you to safely shop online with our participating retailers.",
	icon: "Mobicred.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mobicred:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.mobicredwidget\\.co\\.za"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
