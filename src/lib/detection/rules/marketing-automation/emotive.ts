import type { TechnologyDefinition } from '../../types';

export const emotiveTechnologyDefinition = {
	id: "emotive",
	name: "Emotive",
	website: "https://emotive.io",
	description: "Emotive is a computer software company that provides SaaS, Mobile Marketing, NLP, machine learning, and B2B.",
	icon: "Emotive.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "emotive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("emotivecdn\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emotive:jsGlobal:1",
			kind: "jsGlobal",
			property: "emotivePopupInitializing",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
