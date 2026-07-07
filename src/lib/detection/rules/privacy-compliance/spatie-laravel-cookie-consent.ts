import type { TechnologyDefinition } from '../../types';

export const spatieLaravelCookieConsentTechnologyDefinition = {
	id: "spatie-laravel-cookie-consent",
	name: "Spatie Laravel Cookie Consent",
	website: "https://github.com/spatie/laravel-cookie-consent",
	description: "Spatie Laravel Cookie Consent is a banner that is displayed on websites to ask visitors for consent for the use of cookies.",
	icon: "Spatie.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "spatie-laravel-cookie-consent:jsGlobal:0",
			kind: "jsGlobal",
			property: "laravelCookieConsent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
