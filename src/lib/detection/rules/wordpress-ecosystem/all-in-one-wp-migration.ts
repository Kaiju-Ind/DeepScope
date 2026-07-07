import type { TechnologyDefinition } from '../../types';

export const allInOneWpMigrationTechnologyDefinition = {
	id: "all-in-one-wp-migration",
	name: "All-in-One WP Migration and Backup",
	website: "https://wordpress.org/plugins/all-in-one-wp-migration/",
	description: "All-in-One WP Migration and Backup is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "all-in-one-wp-migration:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/all-in-one-wp-migration/.",
		},
		{
			id: "all-in-one-wp-migration:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/all-in-one-wp-migration/.",
		},
		{
			id: "all-in-one-wp-migration:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/all-in-one-wp-migration/.",
		},
		{
			id: "all-in-one-wp-migration:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-wp\\-migration/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/all-in-one-wp-migration/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
