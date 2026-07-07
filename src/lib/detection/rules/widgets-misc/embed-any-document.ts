import type { TechnologyDefinition } from '../../types';

export const embedAnyDocumentTechnologyDefinition = {
	id: "embed-any-document",
	name: "Embed Any Document",
	website: "https://wordpress.org/plugins/embed-any-document",
	description: "Embed PDF, DOC, PPT and XLS documents easily on your WordPress website.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "embed-any-document:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed-any-document(?:\\/js)?(?:\\/embed-public)?(?:\\/pdfobject)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "embed-any-document:dom:1",
			kind: "dom",
			selector: "#awsm-ead-public-css, link[href*='/wp-content/plugins/embed-any-document/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
