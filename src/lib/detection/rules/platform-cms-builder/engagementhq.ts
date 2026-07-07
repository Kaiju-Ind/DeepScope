import type { TechnologyDefinition } from '../../types';

export const engagementhqTechnologyDefinition = {
	id: "engagementhq",
	name: "EngagementHQ",
	website: "https://granicus.com/solution/govdelivery/engagementhq/",
	description: "Essential software for changemakers. Facilitate, centralize, and analyze two-way conversations between you and your community.",
	icon: "EngagementHQ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "engagementhq:dom:0",
			kind: "dom",
			selector: "link[href*='ehq-production-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
