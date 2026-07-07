import type { TechnologyDefinition } from '../../types';

export const crmTechnologyDefinition = {
	id: "crm",
	name: "CRM+",
	website: "https://www.brainformatik.com",
	description: "CRM+ is a German CRM software product building on Vtiger with GDPR-compliant extensions and improvements.",
	icon: "CRM+.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "crm:dom:0",
			kind: "dom",
			selector: "div.footer > div.floatRight ",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crm:text:1",
			kind: "text",
			pattern: new RegExp("Powered by Brainformatik GmbH"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
	implies: [
		"amcharts",
		"mariadb",
		"sentry",
		"vtiger",
	],
	requires: [
		"apache-http-server",
		"php",
	],
} as const satisfies TechnologyDefinition;
