import type { TechnologyDefinition } from '../../types';

export const directoristTechnologyDefinition = {
	id: "directorist",
	name: "Directorist",
	website: "https://directorist.com",
	description: "Directorist is a business directory plugin that streamlines the creation of scalable, industry-standard, and user-focused online business directories.",
	icon: "Directorist.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "directorist:jsGlobal:0",
			kind: "jsGlobal",
			property: "directorist",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "directorist:jsGlobal:1",
			kind: "jsGlobal",
			property: "directoristCustomRangeSlider",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:wpwax:directorist:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
