import type { TechnologyDefinition } from '../../types';

export const kenectTechnologyDefinition = {
	id: "kenect",
	name: "Kenect",
	website: "https://www.kenect.com",
	description: "Kenect is a platform that provides reputation management and business texting solutions for customer engagement and feedback collection.",
	icon: "Kenect.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "kenect:dom:0",
			kind: "dom",
			selector: "iframe[src*='.kenect.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kenect:jsGlobal:1",
			kind: "jsGlobal",
			property: "toggleKenectWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
