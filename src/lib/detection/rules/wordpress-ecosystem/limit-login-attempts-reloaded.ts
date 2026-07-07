import type { TechnologyDefinition } from '../../types';

export const limitLoginAttemptsReloadedTechnologyDefinition = {
	id: "limit-login-attempts-reloaded",
	name: "Limit Login Attempts Reloaded",
	website: "https://www.limitloginattempts.com",
	description: "Limit Login Attempts Reloaded stops brute-force attacks and optimizes your site performance by limiting the number of login attempts that are possible through the normal login as well as XMLRPC, Woocommerce and custom login pages.",
	icon: "Limit Login Attempts Reloaded.png",
	categories: [
		"wordpress-ecosystem",
		"security",
	],
	rules: [
		{
			id: "limit-login-attempts-reloaded:dom:0",
			kind: "dom",
			selector: "link#llar-login-page-styles-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:limitloginattempts:limit_login_attempts_reloaded:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
