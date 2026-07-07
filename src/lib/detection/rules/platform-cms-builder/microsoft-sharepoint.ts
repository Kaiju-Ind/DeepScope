import type { TechnologyDefinition } from '../../types';

export const microsoftSharepointTechnologyDefinition = {
	id: "microsoft-sharepoint",
	name: "Microsoft SharePoint",
	website: "https://sharepoint.microsoft.com",
	description: "SharePoint is a cloud-based collaborative platform to manage and share content.",
	icon: "Microsoft SharePoint.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "microsoft-sharepoint:jsGlobal:0",
			kind: "jsGlobal",
			property: "SPDesignerProgID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-sharepoint:jsGlobal:1",
			kind: "jsGlobal",
			property: "_spBodyOnLoadCalled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-sharepoint:header:2",
			kind: "header",
			key: "MicrosoftSharePointTeamServices",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-sharepoint:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft SharePoint", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-sharepoint:header:4",
			kind: "header",
			key: "microsoftsharepointteamservices",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-sharepoint:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft sharepoint", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
		cpe: "cpe:2.3:a:microsoft:sharepoint_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
