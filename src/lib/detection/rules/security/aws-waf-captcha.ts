import type { TechnologyDefinition } from '../../types';

export const awsWafCaptchaTechnologyDefinition = {
	id: "aws-waf-captcha",
	name: "AWS WAF Captcha",
	website: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-captcha.html",
	description: "AWS WAF Captcha helps block unwanted bot traffic by requiring users to successfully complete challenges before their web request are allowed to reach AWS WAF protected resources.",
	icon: "AWS WAF Captcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "aws-waf-captcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("captcha\\.awswaf\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aws-waf-captcha:header:1",
			kind: "header",
			key: "x-amzn-waf-action",
			valuePattern: new RegExp("^captcha$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
