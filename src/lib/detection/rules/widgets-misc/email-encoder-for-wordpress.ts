import type { TechnologyDefinition } from '../../types';

export const emailEncoderForWordpressTechnologyDefinition = {
	id: "email-encoder-for-wordpress",
	name: "Email Encoder for Wordpress",
	website: "https://wordpress.org/plugins/email-encoder-bundle",
	description: "Protect email addresses and phone numbers from spambots.",
	icon: "Email Encoder for Wordpress.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "email-encoder-for-wordpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("email-encoder-bundle(?:\\/core)?(?:\\/includes)?(?:\\/assets)?(?:\\/js)?(?:\\/custom)?(?:\\/encoder-form)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "email-encoder-for-wordpress:dom:1",
			kind: "dom",
			selector: "link#eeb-css-frontend-css, link[href*='/wp-content/plugins/email-encoder-bundle/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
