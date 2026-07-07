import type { TechnologyDefinition } from '../../types';

export const reunionMarketingTechnologyDefinition = {
	id: "reunion-marketing",
	name: "Reunion Marketing",
	website: "https://reunionmarketing.com",
	description: "Reunion Marketing is a digital marketing platform for automotive dealerships.",
	icon: "ReunionMarketing.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "reunion-marketing:jsGlobal:0",
			kind: "jsGlobal",
			property: "reunionMarketingApiDomain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
