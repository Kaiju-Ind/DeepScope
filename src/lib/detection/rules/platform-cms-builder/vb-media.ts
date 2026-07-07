import type { TechnologyDefinition } from '../../types';

export const vbMediaTechnologyDefinition = {
	id: "vb-media",
	name: "VB Media",
	website: "https://vb.media",
	description: "VB Media is an ecommerce platform designed for selling print products online.",
	icon: "VBMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vb-media:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_vbm_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
