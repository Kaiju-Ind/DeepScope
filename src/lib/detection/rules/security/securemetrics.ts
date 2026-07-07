import type { TechnologyDefinition } from '../../types';

export const securemetricsTechnologyDefinition = {
	id: "securemetrics",
	name: "SecureMetrics",
	website: "https://www.securitymetrics.com",
	description: "SecurityMetrics is a platform that provides website security assessments and vulnerability testing to identify and address potential threats.",
	icon: "SecurityMetrics.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "securemetrics:dom:0",
			kind: "dom",
			selector: "a[href*='www.securitymetrics.com'] > img[src*='www.securitymetrics.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
