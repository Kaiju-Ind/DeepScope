import type { TechnologyDefinition } from '../../types';

export const cookiefirstTechnologyDefinition = {
	id: "cookiefirst",
	name: "CookieFirst",
	website: "https://cookiefirst.com",
	description: "CookieFirst is an GDPR and CCPA compliant consent management platform.",
	icon: "CookieFirst.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookiefirst:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("consent\\.cookiefirst\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookiefirst:jsGlobal:1",
			kind: "jsGlobal",
			property: "cookiefirst_show_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
