import type { TechnologyDefinition } from '../../types';

export const klaviyoTechnologyDefinition = {
	id: "klaviyo",
	name: "Klaviyo",
	website: "https://www.klaviyo.com/",
	description: "Klaviyo is an email and SMS marketing platform for online businesses.",
	icon: "Klaviyo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "klaviyo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("klaviyo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klaviyo:jsGlobal:1",
			kind: "jsGlobal",
			property: "KlaviyoSubscribe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klaviyo:jsGlobal:2",
			kind: "jsGlobal",
			property: "klaviyo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
