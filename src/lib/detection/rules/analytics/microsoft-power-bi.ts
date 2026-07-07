import type { TechnologyDefinition } from '../../types';

export const microsoftPowerBiTechnologyDefinition = {
	id: "microsoft-power-bi",
	name: "Microsoft Power BI",
	website: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
	description: "Microsoft Power BI is a data analytics platform that transforms company data into rich visuals for insights and decision-making.",
	icon: "MicrosoftPowerBI.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "microsoft-power-bi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("content\\.powerapps\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "microsoft-power-bi:jsGlobal:1",
			kind: "jsGlobal",
			property: "powerBIAccessToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-power-bi:jsGlobal:2",
			kind: "jsGlobal",
			property: "powerBIEmbedToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-power-bi:header:3",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("app\\.powerbi\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-power-bi:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("app\\.powerbi\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-power-bi:header:5",
			kind: "header",
			key: "Timing-Allow-Origin",
			valuePattern: new RegExp("app\\.powerbi\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
