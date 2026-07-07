import type { TechnologyDefinition } from '../../types';

export const listtracTechnologyDefinition = {
	id: "listtrac",
	name: "ListTrac",
	website: "https://listtrac.com",
	description: "ListTrac is a real estate marketing and monitoring system that tracks property listing performance, analyzes user engagement, and provides insights to optimize online visibility and sales strategies.",
	icon: "ListTrac.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "listtrac:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.listtrac\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "listtrac:jsGlobal:1",
			kind: "jsGlobal",
			property: "listTrac.doEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
