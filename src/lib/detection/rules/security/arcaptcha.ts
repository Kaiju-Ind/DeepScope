import type { TechnologyDefinition } from '../../types';

export const arcaptchaTechnologyDefinition = {
	id: "arcaptcha",
	name: "ARCaptcha",
	website: "https://arcaptcha.co",
	description: "ARCaptcha is a CAPTCHA system designed to enhance online security by preventing automated bots from accessing websites.",
	icon: "ARCaptcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "arcaptcha:jsGlobal:0",
			kind: "jsGlobal",
			property: "arcaptcha.checkboxCreatorRegistered",
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
