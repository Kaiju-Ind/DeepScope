import type { TechnologyDefinition } from '../../types';

export const smartemailingTechnologyDefinition = {
	id: "smartemailing",
	name: "SmartEmailing",
	website: "https://www.smartemailing.cz",
	description: "SmartEmailing is a Czech-based marketing solution that provides email marketing tools for creating, managing, and analyzing email campaigns to support customer communication and engagement.",
	icon: "SmartEmailing.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "smartemailing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.smartemailing\\.cz"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
