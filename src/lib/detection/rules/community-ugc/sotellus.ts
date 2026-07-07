import type { TechnologyDefinition } from '../../types';

export const sotellusTechnologyDefinition = {
	id: "sotellus",
	name: "SoTellUs",
	website: "https://sotellus.com",
	description: "SoTellUs is a video review platform.",
	icon: "SoTellUs.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "sotellus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sotellus\\.com\\/js\\/sotellus_widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sotellus:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^stu_src$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
