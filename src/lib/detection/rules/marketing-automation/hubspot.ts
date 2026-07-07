import type { TechnologyDefinition } from '../../types';

export const hubspotTechnologyDefinition = {
	id: "hubspot",
	name: "HubSpot",
	website: "https://www.hubspot.com",
	description: "HubSpot is a marketing and sales software that helps companies attract visitors, convert leads, and close customers.",
	icon: "HubSpot.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hubspot:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Start of Async HubSpot"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "hubspot:jsGlobal:1",
			kind: "jsGlobal",
			property: "_hsq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubspot:jsGlobal:2",
			kind: "jsGlobal",
			property: "hubspot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubspot:dns:3",
			kind: "dns",
			valuePattern: new RegExp("hubspotemail\\.net", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "hubspot:dns:4",
			kind: "dns",
			valuePattern: new RegExp("hubspot-developer-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "hubspot:dns:5",
			kind: "dns",
			valuePattern: new RegExp("hubspot-domain-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "hubspot:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hs-scripts\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hubspot:html:7",
			kind: "html",
			pattern: new RegExp("<!-- start of async hubspot"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
