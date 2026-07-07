import type { TechnologyDefinition } from '../../types';

export const socialladderTechnologyDefinition = {
	id: "socialladder",
	name: "SocialLadder",
	website: "https://socialladderapp.com",
	description: "SocialLadder is a complete end-to-end creator management solution for brands looking to maximize and scale their brand ambassador, influencer, and affiliate marketing efforts.",
	icon: "SocialLadder.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "socialladder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("socialladder\\.rkiapps\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
