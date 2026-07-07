import type { TechnologyDefinition } from '../../types';

export const applicationNameMetaTechnologyDefinition = {
	id: "application-name-meta",
	name: "Application Name Meta",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/application-name",
	description: "Declares a short web application name for browser and app surfaces.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "application-name-meta:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("\\S"),
			confidence: 90,
			description: "Document declares application-name metadata.",
		},
	],
} as const satisfies TechnologyDefinition;
