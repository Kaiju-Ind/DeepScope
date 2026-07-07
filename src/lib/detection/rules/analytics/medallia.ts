import type { TechnologyDefinition } from '../../types';

export const medalliaTechnologyDefinition = {
	id: "medallia",
	name: "Medallia",
	website: "https://www.medallia.com",
	description: "Medallia (formerly Kampyle) is a complete customer feedback platform that helps digital enterprises listen, understand, and act across all digital touch-points.",
	icon: "Medallia.svg",
	categories: [
		"analytics",
		"developer-tooling",
		"surveys-feedback",
	],
	rules: [
		{
			id: "medallia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cf\\.kampyle\\.com\\/k_button\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "medallia:jsGlobal:1",
			kind: "jsGlobal",
			property: "KAMPYLE_COMMON",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "medallia:jsGlobal:2",
			kind: "jsGlobal",
			property: "k_track",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "medallia:jsGlobal:3",
			kind: "jsGlobal",
			property: "kampyle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "medallia:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^k_visit$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
