import type { TechnologyDefinition } from '../../types';

export const surecriticTechnologyDefinition = {
	id: "surecritic",
	name: "SureCritic",
	website: "https://www.surecritic.com",
	description: "SureCritic is a platform that collects, manages, and publishes customer reviews, enabling businesses to gather feedback and display verified ratings about products or services.",
	icon: "SureCritic.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "surecritic:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.surecritic.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
