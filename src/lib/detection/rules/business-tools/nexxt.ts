import type { TechnologyDefinition } from '../../types';

export const nexxtTechnologyDefinition = {
	id: "nexxt",
	name: "Nexxt",
	website: "https://www.nexxt.com",
	description: "Nexxt is a job finder-based system designed to help users search for employment opportunities by matching skills and preferences with job listings across various industries.",
	icon: "Nexxt.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "nexxt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nexxt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nexxt:jsGlobal:1",
			kind: "jsGlobal",
			property: "_bydWto.host",
			valuePattern: new RegExp("\\.nexxt\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
