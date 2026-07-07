import type { TechnologyDefinition } from '../../types';

export const languageDeclarationTechnologyDefinition = {
	id: "language-declaration",
	name: "Language Declaration",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang",
	description: "Declares the document language for browsers, assistive technology, translation, and indexing.",
	categories: [
		"content-publishing",
		"accessibility",
	],
	rules: [
		{
			id: "language-declaration:html:lang",
			kind: "html",
			pattern: new RegExp("<html\\b[^>]*\\blang=[\"'][A-Za-z]{2,3}(?:-[A-Za-z0-9]+)?[\"']", "i"),
			confidence: 100,
			description: "Root HTML element declares a valid language tag.",
		},
		{
			id: "language-declaration:meta:content-language",
			kind: "meta",
			key: "content-language",
			valuePattern: new RegExp("^[A-Za-z]{2,3}(?:-[A-Za-z0-9]+)?(?:\\s*,\\s*[A-Za-z]{2,3}(?:-[A-Za-z0-9]+)?)*$", "i"),
			confidence: 70,
			description: "Document declares content-language metadata.",
		},
	],
} as const satisfies TechnologyDefinition;
