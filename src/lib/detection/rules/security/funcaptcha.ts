import type { TechnologyDefinition } from '../../types';

export const funcaptchaTechnologyDefinition = {
	id: "funcaptcha",
	name: "FunCaptcha",
	website: "https://www.arkoselabs.com/arkose-matchkey/",
	description: "FunCaptcha is a type of CAPTCHA, which is a security measure used to protect websites and online services from spam, bots, and other forms of automated abuse.",
	icon: "fun_captcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "funcaptcha:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.funcaptcha\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
