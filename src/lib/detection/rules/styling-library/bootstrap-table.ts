import type { TechnologyDefinition } from '../../types';

export const bootstrapTableTechnologyDefinition = {
	id: "bootstrap-table",
	name: "Bootstrap Table",
	website: "https://bootstrap-table.wenzhixin.net.cn/",
	description: "Bootstrap Table is a JavaScript plugin for building data tables with Bootstrap.",
	icon: "Bootstrap Table.svg",
	categories: [
		"styling-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "bootstrap-table:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bootstrap-table(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bootstrap-table:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+href=\"[^>]*bootstrap-table(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bootstrap-table:dom:2",
			kind: "dom",
			selector: "link[href*='bootstrap-table.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:bootstrap-table:bootstrap_table:*:*:*:*:*:*:*:*",
	},
	implies: [
		"bootstrap",
		"jquery",
	],
} as const satisfies TechnologyDefinition;
