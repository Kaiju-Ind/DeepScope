import type { TechnologyDefinition } from '../../types';

export const extjsTechnologyDefinition = {
	id: "extjs",
	name: "ExtJS",
	website: "https://www.sencha.com",
	description: "ExtJS is a JavaScript framework developed by Sencha, designed for creating feature-rich, cross-platform web applications with a comprehensive set of UI components and tools.",
	icon: "ExtJS.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "extjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ext-base\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ext",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "Ext.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extjs:jsGlobal:3",
			kind: "jsGlobal",
			property: "Ext.versions.extjs.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:sencha:ext_js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
