import type { TechnologyDefinition } from '../../types';

export const vercelTechnologyDefinition = {
	id: "vercel",
	name: "Vercel",
	website: "https://vercel.com",
	description: "Vercel is a cloud platform for static frontends and serverless functions.",
	icon: "vercel.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "vercel:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:now|vercel)$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vercel:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.vercel-dns\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "vercel:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:now|vercel)$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vercel:header:3",
			kind: "header",
			key: "x-vercel-cache",
			valuePattern: new RegExp(".+", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vercel:header:4",
			kind: "header",
			key: "x-vercel-id",
			valuePattern: new RegExp(".+", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:vercel:vercel:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
