import type { TechnologyDefinition } from '../../types';

export const reallySimpleCaptchaTechnologyDefinition = {
	id: "really-simple-captcha",
	name: "Really Simple CAPTCHA",
	website: "https://wordpress.org/plugins/really-simple-captcha",
	description: "Really Simple CAPTCHA does not work alone and is intended to work with other plugins. It is originally created for Contact Form 7, however, you can use it with your own plugin.",
	icon: "Really Simple CAPTCHA.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "really-simple-captcha:dom:0",
			kind: "dom",
			selector: "img[src*='/wp-content/plugins/really-simple-captcha/']",
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
