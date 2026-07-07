import type { TechnologyDefinition } from '../../types';

export const leadssightTechnologyDefinition = {
	id: "leadssight",
	name: "LeadsSight",
	website: "https://leadssight.com",
	description: "LeadsSight is a tool that converts lost visitors on your website into potential leads by tracking their behaviour.",
	icon: "LeadsSight.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leadssight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.leadssight\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadssight:jsGlobal:1",
			kind: "jsGlobal",
			property: "postURL",
			valuePattern: new RegExp("app\\.leadssight\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
