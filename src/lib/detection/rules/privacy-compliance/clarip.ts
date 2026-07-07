import type { TechnologyDefinition } from '../../types';

export const claripTechnologyDefinition = {
	id: "clarip",
	name: "Clarip",
	website: "https://www.clarip.com",
	description: "Clarip is an enterprise data privacy and risk management platform.",
	icon: "Clarip.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "clarip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/cdn\\.clarip\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clarip:jsGlobal:1",
			kind: "jsGlobal",
			property: "claripCdnHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clarip:jsGlobal:2",
			kind: "jsGlobal",
			property: "claripHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clarip:jsGlobal:3",
			kind: "jsGlobal",
			property: "pageData.claripConsentJSUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
