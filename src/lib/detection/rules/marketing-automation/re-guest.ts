import type { TechnologyDefinition } from '../../types';

export const reGuestTechnologyDefinition = {
	id: "re-guest",
	name: "RE:Guest",
	website: "https://www.reguest.io",
	description: "Re:Guest is a digital room seller that helps hoteliers increase their online visibility and reach more guests.",
	icon: "REGuest.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "re-guest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reguest-hub-api\\.reguest\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
