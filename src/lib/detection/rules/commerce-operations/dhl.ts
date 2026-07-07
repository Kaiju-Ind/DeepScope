import type { TechnologyDefinition } from '../../types';

export const dhlTechnologyDefinition = {
	id: "dhl",
	name: "DHL",
	website: "https://www.dhl.com",
	description: "DHL is an international courier, package delivery and express mail service, which is a division of the German logistics firm Deutsche Post.",
	icon: "DHL.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dhl:text:0",
			kind: "text",
			pattern: new RegExp("\\bDHL\\b"),
			confidence: 25,
			description: "Page text mentions DHL; this is corroborating evidence only.",
		},
		{
			id: "dhl:resourceUrl:owned-host",
			kind: "resourceUrl",
			pattern: new RegExp("https?://[^\\s\"'<>/]*(?:dhl|dhlparcel|dhlglobalmail)\\.[^\\s\"'<>/]+/", "i"),
			confidence: 85,
			description: "Loaded resource URL uses a DHL-owned host.",
		},
		{
			id: "dhl:dom:1",
			kind: "dom",
			selector: "img[alt*='dhl' i]",
			confidence: 35,
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dhl:text:2",
			kind: "text",
			pattern: new RegExp("\\bUK Mail\\b"),
			confidence: 25,
			description: "Page text mentions UK Mail; this is corroborating evidence only.",
		},
	],
} as const satisfies TechnologyDefinition;
