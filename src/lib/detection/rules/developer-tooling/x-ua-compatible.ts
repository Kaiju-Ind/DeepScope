import type { TechnologyDefinition } from '../../types';

export const xUaCompatibleTechnologyDefinition = {
	id: "x-ua-compatible",
	name: "X-UA-Compatible",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv",
	description: "Declares legacy Internet Explorer compatibility mode.",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "x-ua-compatible:meta:0",
			kind: "meta",
			key: "x-ua-compatible",
			confidence: 100,
			description: "Document declares x-ua-compatible.",
		},
	],
} as const satisfies TechnologyDefinition;
