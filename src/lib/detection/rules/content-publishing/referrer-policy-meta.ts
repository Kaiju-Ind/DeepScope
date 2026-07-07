import type { TechnologyDefinition } from '../../types';

export const referrerPolicyMetaTechnologyDefinition = {
	id: "referrer-policy-meta",
	name: "Referrer Policy Meta",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/referrer",
	description: "Declares document-level referrer policy metadata for outgoing requests.",
	categories: [
		"content-publishing",
		"security",
	],
	rules: [
		{
			id: "referrer-policy-meta:meta:referrer",
			kind: "meta",
			key: "referrer",
			valuePattern: new RegExp("^(?:no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url)$", "i"),
			confidence: 100,
			description: "Document declares a recognized referrer policy meta value.",
		},
	],
} as const satisfies TechnologyDefinition;
