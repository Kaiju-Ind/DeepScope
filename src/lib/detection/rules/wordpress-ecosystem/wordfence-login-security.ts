import type { TechnologyDefinition } from '../../types';

export const wordfenceLoginSecurityTechnologyDefinition = {
	id: "wordfence-login-security",
	name: "Wordfence Login Security",
	website: "https://www.wordfence.com",
	description: "Wordfence Login Security contains a subset of the functionality found in the full Wordfence plugin: Two-factor Authentication, XML-RPC Protection and Login Page CAPTCHA.",
	icon: "Wordfence.svg",
	categories: [
		"wordpress-ecosystem",
		"security",
	],
	rules: [
		{
			id: "wordfence-login-security:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wordfence\\/.+login\\.\\d+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
