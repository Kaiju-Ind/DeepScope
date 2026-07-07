import type { TechnologyDefinition } from '../../types';

export const tagtooTechnologyDefinition = {
	id: "tagtoo",
	name: "Tagtoo",
	website: "https://tagtoo.com",
	description: "Tagtoo is an ad platform that provides businesses with digital advertising solutions, specializing in targeted display and programmatic ads to help brands reach their audience more across various online channels.",
	icon: "Tagtoo.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tagtoo:jsGlobal:0",
			kind: "jsGlobal",
			property: "tagtoo_advertiser_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tagtoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "tagtoo_ga",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tagtoo:jsGlobal:2",
			kind: "jsGlobal",
			property: "tagtoo_s",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
