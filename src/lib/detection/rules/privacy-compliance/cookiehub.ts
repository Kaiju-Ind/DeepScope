import type { TechnologyDefinition } from '../../types';

export const cookiehubTechnologyDefinition = {
	id: "cookiehub",
	name: "CookieHub",
	website: "https://www.cookiehub.com",
	description: "CookieHub is a platform that helps website owners comply with data privacy regulations such as GDPR and CCPA by providing tools for managing cookie consent, tracking consent preferences, and ensuring legal compliance related to online tracking and data collection practices.",
	icon: "CookieHub.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookiehub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cookiehub\\.net\\/.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookiehub:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("cookiehub\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
