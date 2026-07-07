import type { TechnologyDefinition } from '../../types';

export const yupTechnologyDefinition = {
	id: "yup",
	name: "Yup",
	website: "https://github.com/jquense/yup",
	description: "Schema builder for runtime value parsing and validation",
	categories: [
		"form-schema-library",
	],
	rules: [
		{
			id: "yup:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\/yup[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "yup:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("node_modules\\/yup"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "yup:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.validateYupSchema\\b"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "yup:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.yupToFormErrors\\b"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
