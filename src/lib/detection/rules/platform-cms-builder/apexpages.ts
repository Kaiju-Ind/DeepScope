import type { TechnologyDefinition } from '../../types';

export const apexpagesTechnologyDefinition = {
	id: "apexpages",
	name: "ApexPages",
	website: "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro.htm",
	icon: "CloudFlare.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "apexpages:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Salesforce\\.com ApexPages", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apexpages:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("salesforce\\.com apexpages", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"salesforce",
	],
} as const satisfies TechnologyDefinition;
