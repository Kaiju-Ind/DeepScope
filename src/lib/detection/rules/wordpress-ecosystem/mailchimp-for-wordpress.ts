import type { TechnologyDefinition } from '../../types';

export const mailchimpForWordpressTechnologyDefinition = {
	id: "mailchimp-for-wordpress",
	name: "MailChimp for WordPress",
	website: "https://www.mc4wp.com",
	description: "MailChimp for WordPress is an email marketing plugin that enables you to build subscriber lists.",
	icon: "MailChimp for WordPress.png",
	categories: [
		"wordpress-ecosystem",
		"marketing-automation",
	],
	rules: [
		{
			id: "mailchimp-for-wordpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mailchimp-for-wp\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailchimp-for-wordpress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/mailchimp-for-wp/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp-for-wordpress:jsGlobal:2",
			kind: "jsGlobal",
			property: "mc4wp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"mailchimp",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
