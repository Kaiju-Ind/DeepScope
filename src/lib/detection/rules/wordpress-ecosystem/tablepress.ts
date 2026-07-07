import type { TechnologyDefinition } from '../../types';

export const tablepressTechnologyDefinition = {
	id: "tablepress",
	name: "TablePress",
	website: "https://tablepress.org",
	description: "TablePress is a free and open source plugin for the WordPress publishing platform. It enables you to create and manage tables on your website, without any coding knowledge.",
	icon: "TablePress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "tablepress:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/tablepress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tablepress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/tablepress/.",
		},
		{
			id: "tablepress:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/tablepress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tablepress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/tablepress/.",
		},
		{
			id: "tablepress:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/tablepress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tablepress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/tablepress/.",
		},
		{
			id: "tablepress:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/tablepress/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tablepress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/tablepress/.",
		},
		{
			id: "tablepress:dom:4",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/tablepress/'], script[src*='/wp-content/plugins/tablepress/'], table.tablepress, .tablepress-table-description, .dt-container .tablepress",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:tablepress:tablepress:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
