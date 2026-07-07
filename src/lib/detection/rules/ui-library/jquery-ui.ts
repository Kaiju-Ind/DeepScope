import type { TechnologyDefinition } from '../../types';

export const jqueryUiTechnologyDefinition = {
	id: "jquery-ui",
	name: "jQuery UI",
	website: "https://jqueryui.com",
	description: "jQuery UI is a collection of GUI widgets, animated visual effects, and themes implemented with jQuery, Cascading Style Sheets, and HTML.",
	icon: "jQuery UI.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery-ui[.-]([\\d.]*\\d)[^/]*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-ui:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d.]+)\\/jquery-ui(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-ui:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("jquery-ui.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-ui:jsGlobal:3",
			kind: "jsGlobal",
			property: "jQuery.ui.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jquery:jquery_ui:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
