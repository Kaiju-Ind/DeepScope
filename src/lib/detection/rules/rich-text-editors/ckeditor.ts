import type { TechnologyDefinition } from '../../types';

export const ckeditorTechnologyDefinition = {
	id: "ckeditor",
	name: "CKEditor",
	website: "https://ckeditor.com",
	description: "CKEditor is a WYSIWYG rich text editor which enables writing content directly inside of web pages or online applications. Its core code is written in JavaScript and it is developed by CKSource. CKEditor is available under open-source and commercial licenses.",
	icon: "CKEditor.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "ckeditor:jsGlobal:0",
			kind: "jsGlobal",
			property: "CKEDITOR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ckeditor:jsGlobal:1",
			kind: "jsGlobal",
			property: "CKEDITOR.version",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ckeditor:jsGlobal:2",
			kind: "jsGlobal",
			property: "CKEDITOR_BASEPATH",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ckeditor:jsGlobal:3",
			kind: "jsGlobal",
			property: "apex.libVersions.ckeditor5",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ckeditor:dom:4",
			kind: "dom",
			selector: "style[data-cke]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ckeditor:jsGlobal:5",
			kind: "jsGlobal",
			property: "CKEDITOR_VERSION",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				template: "5-$1",
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ckeditor:ckeditor:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
