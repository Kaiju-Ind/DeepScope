import type { TechnologyDefinition } from '../../types';

export const friendlyCaptchaTechnologyDefinition = {
	id: "friendly-captcha",
	name: "Friendly Captcha",
	website: "https://friendlycaptcha.com",
	description: "Friendly Captcha is a proof-of-work based solution in which the user’s device does all the work.",
	icon: "FriendlyCaptcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "friendly-captcha:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("x-frc-client\",\"js-(\\d+(\\.\\d+)+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "friendly-captcha:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api.friendlycaptcha.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "friendly-captcha:dom:2",
			kind: "dom",
			selector: "div.frc-captcha",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
