import type { TechnologyDefinition } from '../../types';

export const usercentricsTechnologyDefinition = {
	id: "usercentrics",
	name: "Usercentrics",
	website: "https://usercentrics.com",
	description: "Usercentrics is a SaaS enterprise solution for Consent Management (CMP) that helps enterprise customers to obtain, manage and document the user consent.",
	icon: "Usercentrics.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "usercentrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.usercentrics\\.eu\\/.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "usercentrics:dom:1",
			kind: "dom",
			selector: "link[href*='app.usercentrics.eu'], script[data-usercentrics]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "usercentrics:jsGlobal:2",
			kind: "jsGlobal",
			property: "usercentrics.appVersion",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
