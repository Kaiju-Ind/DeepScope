import type { TechnologyDefinition } from '../../types';

export const deskeroTechnologyDefinition = {
	id: "deskero",
	name: "Deskero",
	website: "https://www.deskero.com/",
	description: "Deskero is a customizable cloud-based help desk software and support ticket system designed to manage customer service.",
	icon: "Deskero.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "deskero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.deskero\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "deskero:jsGlobal:1",
			kind: "jsGlobal",
			property: "deskeroUser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "deskero:jsGlobal:2",
			kind: "jsGlobal",
			property: "deskeroWidget.init",
			description: "Page-owned global matches a known technology marker.",
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
