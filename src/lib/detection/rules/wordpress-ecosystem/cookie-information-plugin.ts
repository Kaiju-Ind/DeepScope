import type { TechnologyDefinition } from '../../types';

export const cookieInformationPluginTechnologyDefinition = {
	id: "cookie-information-plugin",
	name: "Cookie Information plugin",
	website: "https://wordpress.org/plugins/wp-gdpr-compliance",
	description: "Cookie Information plugin helps your website stay compliant with GDPR using a free cookie pop-up, consent log, and more.",
	icon: "Cookie Information.svg",
	categories: [
		"wordpress-ecosystem",
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookie-information-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-gdpr-compliance\\/"),
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
	implies: [
		"cookie-information",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
