import type { TechnologyDefinition } from '../../types';

export const cloudflareStreamTechnologyDefinition = {
	id: "cloudflare-stream",
	name: "Cloudflare Stream",
	website: "https://www.cloudflare.com/products/cloudflare-stream",
	description: "Cloudflare Stream is a serverless live and on-demand video streaming platform.",
	icon: "CloudFlare.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "cloudflare-stream:dom:0",
			kind: "dom",
			selector: "iframe[src*='.cloudflarestream\\.com'], iframe[src*='iframe\\.videodelivery\\.net/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
