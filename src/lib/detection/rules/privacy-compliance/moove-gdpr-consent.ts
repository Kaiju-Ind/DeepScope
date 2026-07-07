import type { TechnologyDefinition } from '../../types';

export const mooveGdprConsentTechnologyDefinition = {
	id: "moove-gdpr-consent",
	name: "Moove GDPR Consent",
	website: "https://www.mooveagency.com/wordpress/gdpr-cookie-compliance-plugin",
	description: "Moove GDPR Consent is a GDPR Cookie Compliance plugin for Wordpress.",
	icon: "Moove.svg",
	categories: [
		"privacy-compliance",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "moove-gdpr-consent:jsGlobal:0",
			kind: "jsGlobal",
			property: "moove_frontend_gdpr_scripts",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
