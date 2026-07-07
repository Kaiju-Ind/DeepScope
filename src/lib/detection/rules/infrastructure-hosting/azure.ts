import type { TechnologyDefinition } from '../../types';

export const azureTechnologyDefinition = {
	id: "azure",
	name: "Azure",
	website: "https://azure.microsoft.com",
	description: "Azure is a cloud computing service for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.",
	icon: "Azure.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "azure:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ARRAffinity$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^TiPMix$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Windows-Azure", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "azure:dns:3",
			kind: "dns",
			valuePattern: new RegExp("\\.azure-dns\\.", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "azure:dns:4",
			kind: "dns",
			valuePattern: new RegExp("azuredns-cloud\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "azure:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^arraffinity$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^tipmix$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure:header:7",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^windows-azure", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:microsoft:azure:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
