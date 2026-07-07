import type { TechnologyDefinition } from '../../types';

export const uservoiceTechnologyDefinition = {
	id: "uservoice",
	name: "UserVoice",
	website: "https://uservoice.com",
	description: "UserVoice is a management to collect and analyse feedback from customers.",
	icon: "UserVoice.svg",
	categories: [
		"developer-tooling",
		"surveys-feedback",
	],
	rules: [
		{
			id: "uservoice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.uservoice\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uservoice:jsGlobal:1",
			kind: "jsGlobal",
			property: "UserVoice",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
