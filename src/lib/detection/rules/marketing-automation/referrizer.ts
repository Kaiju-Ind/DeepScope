import type { TechnologyDefinition } from '../../types';

export const referrizerTechnologyDefinition = {
	id: "referrizer",
	name: "Referrizer",
	website: "https://business.referrizer.com",
	description: "Referrizer is a local business marketing automation solution that supports customer engagement, referral management, and campaign execution across digital channels.",
	icon: "Referrizer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "referrizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.referrizer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "referrizer:jsGlobal:1",
			kind: "jsGlobal",
			property: "referrizerWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
