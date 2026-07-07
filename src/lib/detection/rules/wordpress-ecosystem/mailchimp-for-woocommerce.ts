import type { TechnologyDefinition } from '../../types';

export const mailchimpForWoocommerceTechnologyDefinition = {
	id: "mailchimp-for-woocommerce",
	name: "MailChimp for WooCommerce",
	website: "https://mailchimp.com/integrations/woocommerce",
	description: "MailChimp for WooCommerce gives you the ability to automatically sync customer purchase data to your MailChimp account.",
	icon: "mailchimp.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mailchimp-for-woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mailchimp-for-woocommerce\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:mailchimp:mailchimp_for_woocommerce:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"mailchimp",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
