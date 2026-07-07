import type { TechnologyDefinition } from '../../types';

export const caremergeTechnologyDefinition = {
	id: "caremerge",
	name: "Caremerge",
	website: "https://caremerge.com",
	description: "Caremerge is a provider of resident engagement, family communication, and EHR/eMAR solutions for the senior living industry.",
	icon: "Caremerge.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "caremerge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.caremerge\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "caremerge:jsGlobal:1",
			kind: "jsGlobal",
			property: "cm.domain",
			valuePattern: new RegExp("\\.caremerge\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
