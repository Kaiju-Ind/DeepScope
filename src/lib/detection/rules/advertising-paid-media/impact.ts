import type { TechnologyDefinition } from '../../types';

export const impactTechnologyDefinition = {
	id: "impact",
	name: "Impact",
	website: "https://impact.com/",
	description: "Impact helps businesses contract and pay partners.",
	icon: "Impact.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "impact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("d\\.impactradius-event\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "impact:jsGlobal:1",
			kind: "jsGlobal",
			property: "ImpactRadiusEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "impact:jsGlobal:2",
			kind: "jsGlobal",
			property: "irEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
