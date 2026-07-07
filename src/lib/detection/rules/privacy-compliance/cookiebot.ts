import type { TechnologyDefinition } from '../../types';

export const cookiebotTechnologyDefinition = {
	id: "cookiebot",
	name: "Cookiebot",
	website: "https://www.cookiebot.com",
	description: "Cookiebot is a cloud-driven solution that automatically controls cookies and trackers, enabling full GDPR/ePrivacy and CCPA compliance for websites.",
	icon: "Cookiebot.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookiebot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("consent\\.cookiebot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookiebot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cookiebot.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
