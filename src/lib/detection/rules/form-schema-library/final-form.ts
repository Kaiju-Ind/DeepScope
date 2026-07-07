import type { TechnologyDefinition } from '../../types';

export const finalFormTechnologyDefinition = {
	id: "final-form",
	name: "Final Form",
	website: "https://final-form.org/",
	description: "Framework agnostic, high performance, subscription-based form state management",
	categories: [
		"form-schema-library",
	],
	rules: [
		{
			id: "final-form:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("final-form[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "final-form:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("react-final-form[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "final-form:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"final-form\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "final-form:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"react-final-form\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "final-form:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"FORM_ERROR\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
