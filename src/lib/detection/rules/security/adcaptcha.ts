import type { TechnologyDefinition } from '../../types';

export const adcaptchaTechnologyDefinition = {
	id: "adcaptcha",
	name: "adCAPTCHA",
	website: "https://adcaptcha.com",
	description: "adCAPTCHA is a security tool that integrates marketing and user experience to block bots while enhancing brand visibility, using dynamic content for varied challenges without collecting user data.",
	icon: "adCAPTCHA.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "adcaptcha:jsGlobal:0",
			kind: "jsGlobal",
			property: "adCAPTCHA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcaptcha:jsGlobal:1",
			kind: "jsGlobal",
			property: "adcaptcha_vars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
