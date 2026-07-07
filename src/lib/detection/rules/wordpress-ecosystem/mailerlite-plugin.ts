import type { TechnologyDefinition } from '../../types';

export const mailerlitePluginTechnologyDefinition = {
	id: "mailerlite-plugin",
	name: "MailerLite plugin",
	website: "https://ru.wordpress.org/plugins/official-mailerlite-sign-up-forms/",
	description: "The official MailerLite signup forms plugin makes it easy to grow your newsletter subscriber list from your WordPress blog or website. The plugin automatically integrates your WordPress form with your MailerLite email marketing account.",
	icon: "MailerLite.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mailerlite-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woo-mailerlite\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"mailerlite",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
