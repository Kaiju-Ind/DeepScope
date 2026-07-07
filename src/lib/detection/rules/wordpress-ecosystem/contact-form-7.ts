import type { TechnologyDefinition } from '../../types';

export const contactForm7TechnologyDefinition = {
	id: "contact-form-7",
	name: "Contact Form 7",
	website: "https://contactform7.com",
	description: "Contact Form 7 is an WordPress plugin which can manage multiple contact forms. The form supports Ajax-powered submitting, CAPTCHA, Akismet spam filtering.",
	icon: "Contact Form 7.png",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "contact-form-7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/contact-form-7\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contact-form-7:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/contact-form-7/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "contact-form-7:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpcf7",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:rocklobster:contact_form_7:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
