import type { TechnologyDefinition } from '../../types';

export const reactHookFormTechnologyDefinition = {
	id: "react-hook-form",
	name: "React Hook Form",
	website: "https://react-hook-form.com/",
	description: "Performant, flexible and extensible forms with easy-to-use validation",
	categories: [
		"form-schema-library",
	],
	rules: [
		{
			id: "react-hook-form:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("react-hook-form[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.FormProvider"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.useForm\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.useController\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.useFieldArray\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.useFormContext\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("exports\\.Controller\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("\\bflexRender\\b.*\\buseReactTable\\b|\\buseReactTable\\b.*\\bflexRender\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-hook-form:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("\\bFormProvider\\b.*\\buseForm\\b"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
