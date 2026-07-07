import type { TechnologyDefinition } from '../../types';

export const ringcaptchaTechnologyDefinition = {
	id: "ringcaptcha",
	name: "RingCaptcha",
	website: "https://ringcaptcha.com",
	description: "RingCaptcha is a full stack service that lets you onboard and verify users with SMS.",
	icon: "RingCaptcha.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "ringcaptcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ringcaptcha\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ringcaptcha:jsGlobal:1",
			kind: "jsGlobal",
			property: "RingCaptcha.Widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
