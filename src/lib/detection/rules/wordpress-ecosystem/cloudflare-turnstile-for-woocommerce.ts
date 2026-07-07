import type { TechnologyDefinition } from '../../types';

export const cloudflareTurnstileForWoocommerceTechnologyDefinition = {
	id: "cloudflare-turnstile-for-woocommerce",
	name: "Cloudflare Turnstile for WooCommerce",
	website: "https://wordpress.org/plugins/simple-cloudflare-turnstile/",
	description: "Cloudflare Turnstile Integration Plugin for WooCommerce adds Cloudflare Turnstile support to WooCommerce forms.",
	icon: "CloudFlare.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cloudflare-turnstile-for-woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/simple-cloudflare-turnstile\\/js\\/integrations\\/woocommerce\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
