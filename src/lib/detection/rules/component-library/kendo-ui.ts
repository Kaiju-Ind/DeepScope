import type { TechnologyDefinition } from '../../types';

export const kendoUiTechnologyDefinition = {
	id: "kendo-ui",
	name: "Kendo UI",
	website: "https://www.telerik.com/kendo-ui",
	description: "Kendo UI is an HTML5 user interface framework for building interactive and high-performance websites and applications.",
	icon: "Kendo UI.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "kendo-ui:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]*\\s+href=[^>]*styles\\/kendo\\.common(?:\\.min)?\\.css[^>]*\\/>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "kendo-ui:jsGlobal:1",
			kind: "jsGlobal",
			property: "kendo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kendo-ui:jsGlobal:2",
			kind: "jsGlobal",
			property: "kendo.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kendo-ui:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\/kendo\\/.*-([\\d]{4})%20([\\d\\.]{6})"),
			version: {
				source: "match",
				template: "$1.$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kendo-ui:dom:4",
			kind: "dom",
			selector: "link[href*=kendo]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:progress:kendo_ui:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
