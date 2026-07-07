import type { TechnologyDefinition } from '../../types';

export const geniallyTechnologyDefinition = {
	id: "genially",
	name: "Genially",
	website: "https://genially.com",
	description: "Genially is a platform that enables the creation of interactive and gamified digital experiences for presentations, training, and educational content.",
	icon: "Genially.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "genially:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.genially\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "genially:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Genially", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "genially:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.genially\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "genially:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^genially", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
