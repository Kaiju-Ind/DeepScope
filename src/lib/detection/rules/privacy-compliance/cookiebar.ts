import type { TechnologyDefinition } from '../../types';

export const cookiebarTechnologyDefinition = {
	id: "cookiebar",
	name: "CookieBAR",
	website: "https://cookie-bar.eu",
	description: "CookieBAR is a tool that helps websites comply with the EU cookie law by managing user consent for cookies in accordance with regulatory requirements.",
	icon: "CookieBAR.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookiebar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cookie-bar\\/cookiebar-latest\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookiebar:jsGlobal:1",
			kind: "jsGlobal",
			property: "setupCookieBar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
