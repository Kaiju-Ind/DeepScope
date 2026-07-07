import type { TechnologyDefinition } from '../../types';

export const datocmsTechnologyDefinition = {
	id: "datocms",
	name: "DatoCMS",
	website: "https://www.datocms.com",
	description: "DatoCMS is a cloud-based headless Content as a service (CaaS) platform created to work with static websites, mobile apps and server-side applications of any kind.",
	icon: "DatoCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "datocms:dom:0",
			kind: "dom",
			selector: "link[href*='datocms-assets.com'], img[src*='datocms-assets.com'], source[src*='datocms-assets.com'], div[style*='datocms-assets.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "datocms:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.datocms-assets\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
