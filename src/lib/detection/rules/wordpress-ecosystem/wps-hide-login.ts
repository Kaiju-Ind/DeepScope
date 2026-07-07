import type { TechnologyDefinition } from '../../types';

export const wpsHideLoginTechnologyDefinition = {
	id: "wps-hide-login",
	name: "WPS Hide Login",
	website: "https://wordpress.org/plugins/wps-hide-login/",
	description: "WPS Hide Login is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wps-hide-login:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/wps-hide-login/.",
		},
		{
			id: "wps-hide-login:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/wps-hide-login/.",
		},
		{
			id: "wps-hide-login:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/wps-hide-login/.",
		},
		{
			id: "wps-hide-login:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/wps\\-hide\\-login/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/wps-hide-login/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
