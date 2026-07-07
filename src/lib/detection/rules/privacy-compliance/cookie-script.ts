import type { TechnologyDefinition } from '../../types';

export const cookieScriptTechnologyDefinition = {
	id: "cookie-script",
	name: "Cookie Script",
	website: "https://cookie-script.com",
	description: "Cookie-Script automatically scans, categorizes and adds description to all cookies found on your website.",
	icon: "CookieScript.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookie-script:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cookie-script\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
