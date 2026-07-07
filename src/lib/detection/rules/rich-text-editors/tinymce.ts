import type { TechnologyDefinition } from '../../types';

export const tinymceTechnologyDefinition = {
	id: "tinymce",
	name: "TinyMCE",
	website: "https://www.tiny.cloud/tinymce/",
	description: "TinyMCE is an online rich-text editor released as open-source software. TinyMCE is designed to integrate with JavaScript libraries, Vue.js, and AngularJS as well as content management systems such as Joomla!, and WordPress.",
	icon: "TinyMCE.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "tinymce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/tiny_?mce(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tinymce:jsGlobal:1",
			kind: "jsGlobal",
			property: "tinyMCE.majorVersion",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tinymce:jsGlobal:2",
			kind: "jsGlobal",
			property: "tinymce",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:tiny:tinymce:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
