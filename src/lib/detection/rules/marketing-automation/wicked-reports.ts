import type { TechnologyDefinition } from '../../types';

export const wickedReportsTechnologyDefinition = {
	id: "wicked-reports",
	name: "Wicked Reports",
	website: "https://www.wickedreports.com",
	description: "Wicked Reports is a marketing analytics platform that provides subscription-based, actionable reports on marketing results at each stage of the customer's journey from first click to sale.",
	icon: "WickedReports.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wicked-reports:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.wickedreports\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
