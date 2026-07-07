import type { TechnologyDefinition } from '../../types';

export const coinhiveCaptchaTechnologyDefinition = {
	id: "coinhive-captcha",
	name: "CoinHive Captcha",
	website: "https://coinhive.com",
	description: "Coinhive Captcha provides captcha service that is simple to integrate, where your users’ devices need to solve a number of hashes, adjustable by you, in order to login or post a comment to your site.",
	icon: "CoinHive.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "coinhive-captcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/authedmine\\.com\\/(?:lib\\/captcha|captcha)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coinhive-captcha:dom:1",
			kind: "dom",
			selector: "div.coinhive-captcha",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
