import type { TechnologyDefinition } from '../../types';

export const fluentFormsTechnologyDefinition = {
	id: "fluent-forms",
	name: "Fluent Forms",
	website: "https://fluentforms.com",
	description: "Fluent Forms is a drag-and-drop form builder plugin for WordPress.",
	icon: "Fluent Forms.svg",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "fluent-forms:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/fluentform/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/fluentform/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/fluentform/.",
		},
		{
			id: "fluent-forms:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/fluentform/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/fluentform/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/fluentform/.",
		},
		{
			id: "fluent-forms:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/fluentform/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/fluentform/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/fluentform/.",
		},
		{
			id: "fluent-forms:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/fluentform/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/fluentform/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/fluentform/.",
		},
		{
			id: "fluent-forms:dom:4",
			kind: "dom",
			selector: "form.frm-fluent-form, input[name='__fluent_form_embded_post_id'], .fluentform, .ff-el-group, [data-name='fluentform'], [id^='fluentform_']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fluent-forms:jsGlobal:5",
			kind: "jsGlobal",
			property: "fluentFormVars",
			description: "Page-owned global matches a known technology marker.",
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
