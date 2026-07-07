import type { TechnologyDefinition } from '../../types';

export const dopplerTechnologyDefinition = {
	id: "doppler",
	name: "Doppler",
	website: "https://www.fromdoppler.com",
	description: "Doppler is an email marketing and transactional email service.",
	icon: "Doppler.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "doppler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/(?:hub|cdn)\\.fromdoppler\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
