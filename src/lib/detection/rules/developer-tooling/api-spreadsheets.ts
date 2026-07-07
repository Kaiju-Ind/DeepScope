import type { TechnologyDefinition } from '../../types';

export const apiSpreadsheetsTechnologyDefinition = {
	id: "api-spreadsheets",
	name: "API Spreadsheets",
	website: "https://apispreadsheets.com",
	description: "API Spreadsheets is a developer tool for integrating spreadsheet features into applications, enabling data management, automation, and real-time updates.",
	icon: "APISpreadsheets.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "api-spreadsheets:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.apispreadsheets\\.com"),
			description: "Script content contains a bounded technology signature.",
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
