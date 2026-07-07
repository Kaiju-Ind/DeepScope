import type { TechnologyDefinition } from '../../types';

export const kpaTechnologyDefinition = {
	id: "kpa",
	name: "KPA",
	website: "https://kpa.io",
	description: "KPA is a compliance solutions provider offering software, training, and advisory services that support automotive dealerships and related businesses in meeting regulatory and operational requirements.",
	icon: "KPA.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "kpa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("publiccdn\\.mykpa\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
