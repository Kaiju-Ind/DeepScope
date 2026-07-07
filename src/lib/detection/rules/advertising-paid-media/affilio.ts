import type { TechnologyDefinition } from '../../types';

export const affilioTechnologyDefinition = {
	id: "affilio",
	name: "Affilio",
	website: "https://affilio.ir",
	description: "Affilio is an Iranian affiliate marketing platform.",
	icon: "Affilio.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "affilio:dom:0",
			kind: "dom",
			selector: "a[href*='.affilio.ir/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "affilio:jsGlobal:1",
			kind: "jsGlobal",
			property: "Affilio.widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
