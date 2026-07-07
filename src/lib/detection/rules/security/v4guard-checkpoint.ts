import type { TechnologyDefinition } from '../../types';

export const v4guardCheckpointTechnologyDefinition = {
	id: "v4guard-checkpoint",
	name: "v4Guard Checkpoint",
	website: "https://v4guard.io",
	description: "Checkpoint is a product of v4Guard that verifies website users and prevents fraudulent access to sensitive areas, by checking for any use of anonymisation services with a captcha-like widget.",
	icon: "v4Guard.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "v4guard-checkpoint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.v4guard\\.io\\/checkpoint"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "v4guard-checkpoint:dom:1",
			kind: "dom",
			selector: "iframe[src*='.v4guard.io/checkpoint/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
