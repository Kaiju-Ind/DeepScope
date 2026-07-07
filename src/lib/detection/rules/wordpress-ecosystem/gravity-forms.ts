import type { TechnologyDefinition } from '../../types';

export const gravityFormsTechnologyDefinition = {
	id: "gravity-forms",
	name: "Gravity Forms",
	website: "https://gravityforms.com",
	icon: "gravityforms.svg",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "gravity-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/gravityforms\\/js\\/[^/]+\\.js\\?ver=([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gravity-forms:html:1",
			kind: "html",
			pattern: new RegExp("<div class=(?:\"|')[^>]*gform_wrapper"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gravity-forms:html:2",
			kind: "html",
			pattern: new RegExp("<div class=(?:\"|')[^>]*gform_body"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gravity-forms:html:3",
			kind: "html",
			pattern: new RegExp("<ul [^>]*class=(?:\"|')[^>]*gform_fields"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gravity-forms:html:4",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=(?:\"|')[^>]*wp-content\\/plugins\\/gravityforms\\/css\\/"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gravityforms:gravity_forms:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
