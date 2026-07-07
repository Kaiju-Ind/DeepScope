import type { TechnologyDefinition } from '../../types';

export const enzuzoTechnologyDefinition = {
	id: "enzuzo",
	name: "Enzuzo",
	website: "https://www.enzuzo.com",
	description: "Enzuzo is a data privacy management solution that helps organizations manage consent, comply with privacy regulations, and maintain control over personal data across digital platforms.",
	icon: "Enzuzo.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "enzuzo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.enzuzo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "enzuzo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__ENZUZO_STARTED__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "enzuzo:jsGlobal:2",
			kind: "jsGlobal",
			property: "enzuzoGtmConsentObj",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
