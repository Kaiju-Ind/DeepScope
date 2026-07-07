import type { TechnologyDefinition } from '../../types';

export const wpMailSmtpTechnologyDefinition = {
	id: "wp-mail-smtp",
	name: "WP Mail SMTP by WPForms",
	website: "https://wordpress.org/plugins/wp-mail-smtp/",
	description: "WP Mail SMTP by WPForms is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-mail-smtp:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/wp-mail-smtp/.",
		},
		{
			id: "wp-mail-smtp:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/wp-mail-smtp/.",
		},
		{
			id: "wp-mail-smtp:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/wp-mail-smtp/.",
		},
		{
			id: "wp-mail-smtp:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wp\\-mail\\-smtp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/wp-mail-smtp/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
