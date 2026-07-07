import type { TechnologyDefinition } from '../../types';

export const icommTechnologyDefinition = {
	id: "icomm",
	name: "icomm",
	website: "https://icommkt.com",
	description: "icomm is a platform that helps companies manage their marketing automation strategy using AI-powered tools.",
	icon: "icomm.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "icomm:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.icommarketing\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "icomm:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^ICOMMKT$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "icomm:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.icommarketing\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "icomm:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^icommkt$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
