import type { TechnologyDefinition } from '../../types';

export const mtcaptchaTechnologyDefinition = {
	id: "mtcaptcha",
	name: "MTCaptcha",
	website: "https://www.mtcaptcha.com",
	description: "MTCaptcha is a captcha service that is GDPR and WCAG compliant, providing the confidence of privacy and accessibility.",
	icon: "MTCaptcha.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "mtcaptcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service(?:2)?\\.mtcaptcha\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mtcaptcha:jsGlobal:1",
			kind: "jsGlobal",
			property: "mtcaptcha.getVerifiedToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mtcaptcha:jsGlobal:2",
			kind: "jsGlobal",
			property: "mtcaptchaConfig.sitekey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
