import type { TechnologyDefinition } from '../../types';

export const datatablesTechnologyDefinition = {
	id: "datatables",
	name: "DataTables",
	website: "https://datatables.net",
	description: "DataTables is a plug-in for the jQuery Javascript library adding advanced features like pagination, instant search, themes, and more to any HTML table.",
	icon: "DataTables.png",
	categories: [
		"table-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "datatables:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dataTables.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "datatables:jsGlobal:1",
			kind: "jsGlobal",
			property: "$.fn.dataTable.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "datatables:jsGlobal:2",
			kind: "jsGlobal",
			property: "jQuery.fn.dataTable.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "datatables:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("datatables.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:datatables:datatables.net:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
