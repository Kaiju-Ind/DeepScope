import type { TechnologyDefinition } from '../../types';

export const counselingKitTechnologyDefinition = {
	id: "counseling-kit",
	name: "Counseling Kit",
	website: "https://counselingkit.com",
	description: "Counseling Kit is a HIPAA-compliant platform offering professional online tools designed specifically for therapists to support virtual therapy sessions.",
	icon: "CounselingKit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "counseling-kit:dom:0",
			kind: "dom",
			selector: "div[data-url*='www.counselingkit.com/'], link[href*='/ico/counselingkit/']",
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
