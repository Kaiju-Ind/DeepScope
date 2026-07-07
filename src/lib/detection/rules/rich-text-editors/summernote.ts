import type { TechnologyDefinition } from '../../types';

export const summernoteTechnologyDefinition = {
	id: "summernote",
	name: "Summernote",
	website: "https://summernote.org",
	description: "Summernote is an open-source JavaScript library that offers a feature-rich WYSIWYG editor for web applications, allowing users to create and edit formatted content in a familiar word processor-like interface.",
	icon: "Summernote.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "summernote:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:S|s)ummernote(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "summernote:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/summernote(?:@|-)([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "summernote:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:s|s)ummernote(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:summernote:summernote:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
