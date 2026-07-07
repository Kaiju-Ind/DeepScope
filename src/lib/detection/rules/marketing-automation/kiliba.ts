import type { TechnologyDefinition } from '../../types';

export const kilibaTechnologyDefinition = {
	id: "kiliba",
	name: "Kiliba",
	website: "https://en.kiliba.com",
	description: "Kiliba has developed a module that automates the marketing process from creating an email to distributing it.",
	icon: "Kiliba.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kiliba:url:0",
			kind: "url",
			pattern: new RegExp("\\/modules\\/kiliba\\/logo\\.png"),
			description: "Page URL matches a known technology marker.",
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
