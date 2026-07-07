import type { TechnologyDefinition } from '../../types';

export const microsoftAdvertisingTechnologyDefinition = {
	id: "microsoft-advertising",
	name: "Microsoft Advertising",
	website: "https://ads.microsoft.com",
	description: "Microsoft Advertising is an online advertising platform developed by Microsoft.",
	icon: "Microsoft.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "microsoft-advertising:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bat\\.bing\\.com/bat\\.js", "i"),
			confidence: 100,
			description: "Microsoft Advertising UET script is declared.",
		},
		{
			id: "microsoft-advertising:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("bat\\.bing\\.com/(?:bat\\.js|action/)", "i"),
			confidence: 100,
			description: "Microsoft Advertising UET request was observed.",
		},
		{
			id: "microsoft-advertising:resourceUrl:2",
			kind: "resourceUrl",
			pattern: new RegExp("bat\\.bing\\.com/bat\\.js", "i"),
			confidence: 100,
			description: "Microsoft Advertising UET script loaded as a resource.",
		},
		{
			id: "microsoft-advertising:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_uet(?:sid|vid)$", "i"),
			confidence: 90,
			description: "Microsoft Advertising UET cookie name is present.",
		},
		{
			id: "microsoft-advertising:jsGlobal:4",
			kind: "jsGlobal",
			property: "uetq",
			confidence: 90,
			description: "Microsoft Advertising UET queue global is present.",
		},
	],
	metadata: {
		saas: true,
		pricing: ["payg"],
	},
} as const satisfies TechnologyDefinition;
