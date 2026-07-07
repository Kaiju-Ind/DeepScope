import type { TechnologyDefinition } from '../../types';

export const twilioAuthyTechnologyDefinition = {
	id: "twilio-authy",
	name: "Twilio Authy",
	website: "https://authy.com",
	description: "Twilio Authy provides Two-factor authentication (2FA) adds an additional layer of protection beyond passwords.",
	icon: "twilio_authy.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "twilio-authy:jsGlobal:0",
			kind: "jsGlobal",
			property: "Authy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
