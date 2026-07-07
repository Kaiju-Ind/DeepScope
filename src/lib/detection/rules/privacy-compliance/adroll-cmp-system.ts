import type { TechnologyDefinition } from '../../types';

export const adrollCmpSystemTechnologyDefinition = {
	id: "adroll-cmp-system",
	name: "AdRoll CMP System",
	website: "https://www.adroll.com/features/consent-management",
	description: "AdRoll CMP System is a consent management solution.",
	icon: "AdRoll.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "adroll-cmp-system:jsGlobal:0",
			kind: "jsGlobal",
			property: "__adroll_consent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adroll-cmp-system:jsGlobal:1",
			kind: "jsGlobal",
			property: "__adroll_consent_is_gdpr",
			description: "Page-owned global matches a known technology marker.",
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
