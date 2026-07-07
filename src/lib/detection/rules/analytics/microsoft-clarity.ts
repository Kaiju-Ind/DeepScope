import type { TechnologyDefinition } from '../../types';

export const microsoftClarityTechnologyDefinition = {
	id: "microsoft-clarity",
	name: "Microsoft Clarity",
	website: "https://clarity.microsoft.com",
	description: "Microsoft's Clarity is an analytics tool which provides website usage statistics, session recording, and heatmaps.",
	icon: "Microsoft Clarity.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "microsoft-clarity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.clarity\\.ms\\/.+\\/([\\d.]+)\\/clarity\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "microsoft-clarity:jsGlobal:1",
			kind: "jsGlobal",
			property: "clarity",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-clarity:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("Error CL001: Multiple Clarity tags detected"),
			confidence: 65,
			description: "Bundled script content matches a Microsoft Clarity runtime marker.",
		},
		{
			id: "microsoft-clarity:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("['\"]claritySheetId['\"]"),
			confidence: 65,
			description: "Bundled script content matches a Microsoft Clarity runtime marker.",
		},
		{
			id: "microsoft-clarity:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("['\"]clarityOperationCount['\"]"),
			confidence: 65,
			description: "Bundled script content matches a Microsoft Clarity runtime marker.",
		},
		{
			id: "microsoft-clarity:resourceUrl:modern:5",
			kind: "resourceUrl",
			pattern: new RegExp("clarity\\.ms"),
			confidence: 75,
			description: "Resource URL matches a Microsoft Clarity collection or runtime host.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
