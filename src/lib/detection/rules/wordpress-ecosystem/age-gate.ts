import type { TechnologyDefinition } from '../../types';

export const ageGateTechnologyDefinition = {
	id: "age-gate",
	name: "Age Gate",
	website: "https://wordpress.org/plugins/age-gate",
	description: "A plugin to check the age of a visitor for Wordpress.",
	icon: "Age Gate.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "age-gate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/age\\-gate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/age\\-gate/[^?#\\s\"\\']+[?&]v(?:er)?=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/age-gate/.",
		},
		{
			id: "age-gate:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/age-gate/'], .age-gate, .age-gate-form, button[name='age_gate[confirm]']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "age-gate:jsGlobal:2",
			kind: "jsGlobal",
			property: "age_gate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "age-gate:resourceUrl:3",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/age\\-gate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/age\\-gate/[^?#\\s\"\\']+[?&]v(?:er)?=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/age-gate/.",
		},
		{
			id: "age-gate:stylesheetHref:4",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/age\\-gate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/age\\-gate/[^?#\\s\"\\']+[?&]v(?:er)?=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/age-gate/.",
		},
		{
			id: "age-gate:html:5",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/age\\-gate/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/age\\-gate/[^?#\\s\"\\']+[?&]v(?:er)?=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/age-gate/.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
