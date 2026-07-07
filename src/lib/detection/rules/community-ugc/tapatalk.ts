import type { TechnologyDefinition } from '../../types';

export const tapatalkTechnologyDefinition = {
	id: "tapatalk",
	name: "Tapatalk",
	website: "https://www.tapatalk.com",
	description: "Tapatalk is a mobile-enablement platform that optimizes forums and blogs for engagement.",
	icon: "Tapatalk.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "tapatalk:dom:0",
			kind: "dom",
			selector: "link[href*='.quoord.tapatalkpro.activity']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
