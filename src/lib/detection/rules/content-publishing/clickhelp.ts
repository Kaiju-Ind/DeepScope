import type { TechnologyDefinition } from '../../types';

export const clickhelpTechnologyDefinition = {
	id: "clickhelp",
	name: "ClickHelp",
	website: "https://clickhelp.com",
	description: "ClickHelp is an AI-powered all-in-one documentation tool designed to create, manage, and publish technical content.",
	icon: "ClickHelp.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clickhelp:dom:0",
			kind: "dom",
			selector: "script#dxss_CI_301868994",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "clickhelp:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.clickhelp\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "clickhelp:header:2",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.clickhelp\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
