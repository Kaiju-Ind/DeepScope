import type { TechnologyDefinition } from '../../types';

export const daxkoTechnologyDefinition = {
	id: "daxko",
	name: "Daxko",
	website: "https://www.daxko.com",
	description: "Daxko is a member-based health and wellness management system.",
	icon: "Daxko.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "daxko:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.daxko\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "daxko:header:1",
			kind: "header",
			key: "Reporting-Endpoints",
			valuePattern: new RegExp("daxkosecurity\\.report-uri\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "daxko:header:2",
			kind: "header",
			key: "reporting-endpoints",
			valuePattern: new RegExp("daxkosecurity\\.report-uri\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
