import type { TechnologyDefinition } from '../../types';

export const quformTechnologyDefinition = {
	id: "quform",
	name: "Quform",
	website: "https://www.quform.com",
	description: "Quform is a WordPress plugin designed for building and managing forms.",
	icon: "Quform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "quform:jsGlobal:0",
			kind: "jsGlobal",
			property: "Quform.captchaRefreshFormQueue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quform:jsGlobal:1",
			kind: "jsGlobal",
			property: "QuformRecaptchaLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
