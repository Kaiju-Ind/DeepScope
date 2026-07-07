import type { TechnologyDefinition } from '../../types';

export const cookieSealTechnologyDefinition = {
	id: "cookie-seal",
	name: "Cookie Seal",
	website: "https://cookieseal.com",
	description: "Cookie Seal is a tool or system that helps you manage and configure the use of cookies on your website in accordance with data protection laws, ensuring compliance with relevant regulations.",
	icon: "Cookie Seal.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookie-seal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cookieseal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookie-seal:dom:1",
			kind: "dom",
			selector: "link[href*='assets.cookieseal.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cookie-seal:jsGlobal:2",
			kind: "jsGlobal",
			property: "CookieSeal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cookie-seal:jsGlobal:3",
			kind: "jsGlobal",
			property: "cookieSeal.consentEnabled",
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
