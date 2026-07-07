import type { TechnologyDefinition } from '../../types';

export const jszipTechnologyDefinition = {
	id: "jszip",
	name: "JSZip",
	website: "https://stuk.github.io/jszip/",
	description: "JSZip is a JavaScript library that enables the creation, reading, and manipulation of zip files in a browser environment.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jszip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jszip\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jszip:jsGlobal:1",
			kind: "jsGlobal",
			property: "JSZip.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:jszip_project:jszip:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
