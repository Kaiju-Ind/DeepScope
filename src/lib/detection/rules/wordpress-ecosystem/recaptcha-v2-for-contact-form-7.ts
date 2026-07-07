import type { TechnologyDefinition } from '../../types';

export const recaptchaV2ForContactForm7TechnologyDefinition = {
	id: "recaptcha-v2-for-contact-form-7",
	name: "ReCaptcha v2 for Contact Form 7",
	website: "https://wordpress.org/plugins/wpcf7-recaptcha/",
	description: "Contact Form 7 v5.1 dropped support for reCaptcha v2 along with the [recaptcha] tag December 2018. This plugin brings that functionality back from Contact Form 7 5.0.5 and re-adds the [recaptcha] tag.",
	icon: "ReCaptcha v2 for Contact Form 7.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "recaptcha-v2-for-contact-form-7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wpcf7-recaptcha\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
	},
	implies: [
		"contact-form-7",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
