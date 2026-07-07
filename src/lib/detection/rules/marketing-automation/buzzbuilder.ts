import type { TechnologyDefinition } from '../../types';

export const buzzbuilderTechnologyDefinition = {
	id: "buzzbuilder",
	name: "BuzzBuilder",
	website: "https://buzzbuilderpro.com",
	description: "BuzzBuilder is an automated sales platform that generates qualified leads through email campaigns, LinkedIn engagement, and follow-up calls.",
	icon: "BuzzBuilder.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "buzzbuilder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.buzzbuilderpro\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buzzbuilder:jsGlobal:1",
			kind: "jsGlobal",
			property: "buzzbuilder",
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
