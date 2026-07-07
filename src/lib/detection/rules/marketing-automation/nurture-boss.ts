import type { TechnologyDefinition } from '../../types';

export const nurtureBossTechnologyDefinition = {
	id: "nurture-boss",
	name: "Nurture Boss",
	website: "https://nurtureboss.io",
	description: "Nurture Boss is an AI platform for engaging with prospects and residents, automating the leasing process from lead to renewal.",
	icon: "NurtureBoss.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nurture-boss:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.nurtureboss\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
