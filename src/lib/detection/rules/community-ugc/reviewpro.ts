import type { TechnologyDefinition } from '../../types';

export const reviewproTechnologyDefinition = {
	id: "reviewpro",
	name: "ReviewPro",
	website: "https://reviewpro.shijigroup.com",
	description: "ReviewPro is a hotel guest review system designed to collect and analyze guest feedback.",
	icon: "ReviewPro.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewpro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sapi\\.reviewpro\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
