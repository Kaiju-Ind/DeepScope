import type { TechnologyDefinition } from '../../types';

export const vergecloudTechnologyDefinition = {
	id: "vergecloud",
	name: "VergeCloud",
	website: "https://www.vergecloud.com/",
	description: "VergeCloud is a cloud services provider offering CDN and DNS services, security solutions, and a reliable TCP proxy to support online presence.",
	icon: "VergeCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "vergecloud:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^vergecloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vergecloud:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^vergecloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
