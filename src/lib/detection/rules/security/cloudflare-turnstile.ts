import type { TechnologyDefinition } from '../../types';

export const cloudflareTurnstileTechnologyDefinition = {
	id: "cloudflare-turnstile",
	name: "Cloudflare Turnstile",
	website: "https://www.cloudflare.com/products/turnstile",
	description: "Turnstile is Cloudflare's smart CAPTCHA alternative.",
	icon: "CloudFlare.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "cloudflare-turnstile:jsGlobal:0",
			kind: "jsGlobal",
			property: "turnstile",
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
