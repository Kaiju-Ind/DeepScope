import type { TechnologyDefinition } from '../../types';

export const hcaptchaTechnologyDefinition = {
	id: "hcaptcha",
	name: "hCaptcha",
	website: "https://www.hcaptcha.com",
	description: "hCaptcha is an anti-bot solution that protects user privacy and rewards websites.",
	icon: "hCaptcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "hcaptcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hcaptcha\\.com\\/([\\d]+?)\\/api\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hcaptcha:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("#cf-hcaptcha-container"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "hcaptcha:dom:2",
			kind: "dom",
			selector: "link[href*='hcaptcha.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hcaptcha:jsGlobal:3",
			kind: "jsGlobal",
			property: "hcaptcha.getRespKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hcaptcha:jsGlobal:4",
			kind: "jsGlobal",
			property: "hcaptchaOnLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hcaptcha:jsGlobal:5",
			kind: "jsGlobal",
			property: "hcaptcha_sitekey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hcaptcha:header:6",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("(?:\\.|\\/\\/)hcaptcha\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
