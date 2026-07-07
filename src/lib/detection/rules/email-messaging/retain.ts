import type { TechnologyDefinition } from '../../types';

export const retainTechnologyDefinition = {
	id: "retain",
	name: "Retain",
	website: "https://retain.ir",
	description: "Retain is an online conversation system developed in Iran designed to facilitate digital communication.",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "retain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.retain\\.ir\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
