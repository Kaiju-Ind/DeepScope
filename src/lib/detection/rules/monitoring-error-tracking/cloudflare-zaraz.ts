import type { TechnologyDefinition } from '../../types';

export const cloudflareZarazTechnologyDefinition = {
	id: "cloudflare-zaraz",
	name: "Cloudflare Zaraz",
	website: "https://www.cloudflare.com/products/zaraz/",
	description: "Cloudflare Zaraz gives you complete control over third-party tools and services for your website, and allows you to offload them to Cloudflare’s edge, improving the speed and security of your website.",
	icon: "CloudFlare.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "cloudflare-zaraz:jsGlobal:0",
			kind: "jsGlobal",
			property: "zaraz",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cloudflare-zaraz:jsGlobal:1",
			kind: "jsGlobal",
			property: "zarazData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
