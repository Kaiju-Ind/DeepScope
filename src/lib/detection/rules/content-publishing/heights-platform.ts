import type { TechnologyDefinition } from '../../types';

export const heightsPlatformTechnologyDefinition = {
	id: "heights-platform",
	name: "Heights Platform",
	website: "https://www.heightsplatform.com",
	description: "Heights Platform is an all-in-one platform for creating and selling online courses.",
	icon: "HeightsPlatform.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "heights-platform:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_Heights_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "heights-platform:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("uploads\\.heightsplatform\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "heights-platform:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_heights_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "heights-platform:header:3",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("uploads\\.heightsplatform\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
