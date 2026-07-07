import type { TechnologyDefinition } from '../../types';

export const dressonTechnologyDefinition = {
	id: "dresson",
	name: "DressOn",
	website: "https://dresson.com.br",
	description: "DressOn is an AI-powered virtual fitting room that lets online shoppers try on clothes digitally.",
	icon: "DressOn.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "dresson:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.dresson\\.com\\.br\\/widget\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
