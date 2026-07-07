import type { TechnologyDefinition } from '../../types';

export const superblogTechnologyDefinition = {
	id: "superblog",
	name: "Superblog",
	website: "https://superblog.ai",
	description: "Superblog is a blogging platform that automatically manages SEO audits, page speed optimization, sudden traffic spikes, and reader experience.",
	icon: "Superblog.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "superblog:dom:0",
			kind: "dom",
			selector: "link[href*='superblog.supercdn.cloud/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
