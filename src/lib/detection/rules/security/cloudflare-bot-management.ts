import type { TechnologyDefinition } from '../../types';

export const cloudflareBotManagementTechnologyDefinition = {
	id: "cloudflare-bot-management",
	name: "Cloudflare Bot Management",
	website: "https://www.cloudflare.com/en-gb/products/bot-management/",
	description: "Cloudflare bot management solution identifies and mitigates automated traffic to protect websites from bad bots.",
	icon: "CloudFlare.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "cloudflare-bot-management:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^__cf_bm$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"cloudflare",
	],
} as const satisfies TechnologyDefinition;
