import type { TechnologyDefinition } from '../../types';

export const clickreportTechnologyDefinition = {
	id: "clickreport",
	name: "ClickReport",
	website: "https://www.clickreport.com",
	description: "ClickReport is a platform that provides PPC click fraud prevention by detecting and blocking invalid or malicious ad traffic.",
	icon: "ClickReport.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "clickreport:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service\\.clickreport\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
