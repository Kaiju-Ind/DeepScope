import type { TechnologyDefinition } from '../../types';

export const mailchimpForWpTechnologyDefinition = {
	id: "mailchimp-for-wp",
	name: "MC4WP: Mailchimp for WordPress",
	website: "https://wordpress.org/plugins/mailchimp-for-wp/",
	description: "MC4WP: Mailchimp for WordPress is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mailchimp-for-wp:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/mailchimp-for-wp/.",
		},
		{
			id: "mailchimp-for-wp:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/mailchimp-for-wp/.",
		},
		{
			id: "mailchimp-for-wp:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/mailchimp-for-wp/.",
		},
		{
			id: "mailchimp-for-wp:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/mailchimp\\-for\\-wp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/mailchimp-for-wp/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
