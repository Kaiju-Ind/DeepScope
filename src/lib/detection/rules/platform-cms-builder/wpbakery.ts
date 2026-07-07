import type { TechnologyDefinition } from '../../types';

export const wpbakeryTechnologyDefinition = {
	id: "wpbakery",
	name: "wpBakery",
	website: "https://wpbakery.com",
	description: "WPBakery is a drag and drop visual page builder plugin for WordPress.",
	icon: "wpBakery.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wpbakery:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WPBakery", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wpbakery:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("wpbakery", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wpbakery:html:2",
			kind: "html",
			pattern: new RegExp("\\bjs\\-comp\\-ver\\-([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Document HTML contains the WPBakery js-comp-ver version class.",
		},
		{
			id: "wpbakery:html:3",
			kind: "html",
			pattern: new RegExp("\\b(wpb\\-js\\-composer|vc_responsive|vc_row|vc_column)\\b", "i"),
			description: "Document HTML contains WPBakery page builder classes.",
		},
		{
			id: "wpbakery:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("\\b(vc_map|vc_add_param|vc_add_default_templates|vc_shortcodes_css_class)\\b", "i"),
			description: "Script content contains WPBakery shortcode API markers.",
		},
		{
			id: "wpbakery:resourceUrl:5",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/js_composer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/js_composer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/js_composer/.",
		},
		{
			id: "wpbakery:stylesheetHref:6",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/js_composer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/js_composer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/js_composer/.",
		},
		{
			id: "wpbakery:scriptSrc:7",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/js_composer/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/js_composer/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/js_composer/.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	implies: [
		"php",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
