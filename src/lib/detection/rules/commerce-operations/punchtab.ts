import type { TechnologyDefinition } from '../../types';

export const punchtabTechnologyDefinition = {
	id: "punchtab",
	name: "PunchTab",
	website: "http://www.punchtab.com",
	description: "PunchTab is a SaaS-based Consumer Management Platform (CMP) for brands to build and optimize direct consumer relationships.",
	icon: "PunchTab.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "punchtab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.punchtab\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
