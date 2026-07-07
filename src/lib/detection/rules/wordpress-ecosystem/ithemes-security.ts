import type { TechnologyDefinition } from '../../types';

export const ithemesSecurityTechnologyDefinition = {
	id: "ithemes-security",
	name: "iThemes Security",
	website: "https://ithemes.com/security",
	description: "iThemes Security(formerly known as Better WP Security) plugin enhances the security and protection of your WordPress website.",
	icon: "iThemes Security.svg",
	categories: [
		"wordpress-ecosystem",
		"security",
	],
	rules: [
		{
			id: "ithemes-security:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/better-wp-security\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ithemes-security:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/better-wp-security/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:ithemes:ithemes_security:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
