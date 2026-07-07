import type { TechnologyDefinition } from '../../types';

export const quintypeTechnologyDefinition = {
	id: "quintype",
	name: "Quintype",
	website: "https://www.quintype.com",
	description: "Quintype is a digital publishing platform that provides content management, audience engagement, and monetisation solutions for digital media organisations.",
	icon: "Quintype.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quintype:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^qtype\\-session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "quintype:header:1",
			kind: "header",
			key: "link",
			valuePattern: new RegExp("fea\\.assettype\\.com\\/quintype-ace", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
