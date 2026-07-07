import type { TechnologyDefinition } from '../../types';

export const truendoTechnologyDefinition = {
	id: "truendo",
	name: "TRUENDO",
	website: "https://truendo.com",
	description: "TRUENDO is a GDPR compliance software.",
	icon: "TRUENDO.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "truendo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.priv\\.center\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "truendo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.truendo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "truendo:jsGlobal:2",
			kind: "jsGlobal",
			property: "Truendo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "truendo:jsGlobal:3",
			kind: "jsGlobal",
			property: "TruendoCookieControlCallback",
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
