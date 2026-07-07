import type { TechnologyDefinition } from '../../types';

/**
 * Detects React Server Components from the transport markers that survive
 * production bundling. The `_rsc` query parameter and `text/x-component`
 * response content type are framework protocol evidence, not marketing copy or
 * incidental page text.
 */
export const reactServerComponentsTechnologyDefinition = {
	id: "react-server-components",
	name: "React Server Components",
	website: "https://react.dev/reference/rsc/server-components",
	description: "React Server Components stream server-rendered component payloads to the client so frameworks can mix server and client UI boundaries.",
	categories: [
		"framework",
		"ui-library",
	],
	rules: [
		{
			id: "react-server-components:requestUrl:rsc-query",
			kind: "requestUrl",
			pattern: /[?&]_rsc=/i,
			confidence: 95,
			description: "Request URL includes the React Server Components `_rsc` transport parameter.",
		},
		{
			id: "react-server-components:responseHeader:content-type",
			kind: "responseHeader",
			key: "content-type",
			valuePattern: /\btext\/x-component\b/i,
			confidence: 95,
			description: "Response content type identifies a React Server Components payload.",
		},
		{
			id: "react-server-components:scriptContent:protocol-constant",
			kind: "scriptContent",
			pattern: /RSC_CONTENT_TYPE_HEADER|text\/x-component/i,
			confidence: 75,
			description: "Bundled script references the React Server Components transport content type.",
		},
	],
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
