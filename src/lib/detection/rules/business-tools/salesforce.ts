import type { TechnologyDefinition } from '../../types';

export const salesforceTechnologyDefinition = {
	id: "salesforce",
	name: "Salesforce",
	website: "https://www.salesforce.com",
	description: "Salesforce is a cloud computing service software (SaaS) that specializes in customer relationship management (CRM).",
	icon: "Salesforce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesforce:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+=\"brandQuaternaryFgrs\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "salesforce:jsGlobal:1",
			kind: "jsGlobal",
			property: "SFDCApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:jsGlobal:2",
			kind: "jsGlobal",
			property: "SFDCCmp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:jsGlobal:3",
			kind: "jsGlobal",
			property: "SFDCPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:jsGlobal:4",
			kind: "jsGlobal",
			property: "SFDCSessionVars",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^com\\.salesforce$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "salesforce:dns:6",
			kind: "dns",
			valuePattern: new RegExp("salesforce\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "salesforce:jsGlobal:7",
			kind: "jsGlobal",
			property: "pardot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:jsGlobal:8",
			kind: "jsGlobal",
			property: "piHostname",
			valuePattern: new RegExp("pi.pardot"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce:html:9",
			kind: "html",
			pattern: new RegExp("<[^>]+=\"brandquaternaryfgrs\""),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
		cpe: "cpe:2.3:a:salesforce:*:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
