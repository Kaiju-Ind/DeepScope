import type { TechnologyDefinition } from '../../types';

export const cookieNoticeTechnologyDefinition = {
	id: "cookie-notice",
	name: "Cookie Notice",
	website: "https://wordpress.org/plugins/cookie-notice",
	description: "Cookie Notice provides a simple, customizable website banner that can be used to help your website comply with certain cookie consent requirements under the EU GDPR cookie law and CCPA regulations and includes seamless integration with Cookie Compliance to help your site comply with the latest updates to existing consent laws.",
	icon: "Cookie Notice.png",
	categories: [
		"privacy-compliance",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cookie-notice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/cookie-notice\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
