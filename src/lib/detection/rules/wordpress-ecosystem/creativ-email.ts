import type { TechnologyDefinition } from '../../types';

export const creativEmailTechnologyDefinition = {
	id: "creativ-email",
	name: "Creativ.eMail",
	website: "https://www.creativemail.com",
	description: "Creativ.eMail is an email editor WordPress plugin which simplifies email marketing campaign creation and pulls your WordPress blog posts, website images and WooCommerce products right into your email content.",
	icon: "Creativ.eMail.svg",
	categories: [
		"wordpress-ecosystem",
		"email-messaging",
	],
	rules: [
		{
			id: "creativ-email:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/creative-mail-by-constant-contact\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
