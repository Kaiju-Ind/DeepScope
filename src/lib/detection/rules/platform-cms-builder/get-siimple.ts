import type { TechnologyDefinition } from '../../types';

export const getSiimpleTechnologyDefinition = {
	id: "get-siimple",
	name: "Get Siimple",
	website: "https://getsiimple.com",
	description: "Get Siimple is a tool that enables the creation of a single-page website without requiring technical or design expertise.",
	icon: "GetSiimple.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "get-siimple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.getsiimple\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
