import type { TechnologyDefinition } from '../../types';

export const usocialTechnologyDefinition = {
	id: "usocial",
	name: "uSocial",
	website: "https://usocial.pro",
	description: "uSocial is a tool that generates customizable Share and Like buttons for websites, enabling quick integration of social interaction features.",
	icon: "uSocial.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "usocial:jsGlobal:0",
			kind: "jsGlobal",
			property: "uSocial.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "usocial:jsGlobal:1",
			kind: "jsGlobal",
			property: "uSocialLogin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "usocial:jsGlobal:2",
			kind: "jsGlobal",
			property: "uSocialShare",
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
