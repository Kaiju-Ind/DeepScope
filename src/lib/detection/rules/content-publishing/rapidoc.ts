import type { TechnologyDefinition } from '../../types';

export const rapidocTechnologyDefinition = {
	id: "rapidoc",
	name: "RapiDoc",
	website: "https://rapidocweb.com",
	description: "RapiDoc is an open-source web component that generates interactive API documentation from OpenAPI specifications.",
	icon: "RapiDoc.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "rapidoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^|\\/)rapidoc(?:-min)?\\.js(?:[?#]|$)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rapidoc:dom:1",
			kind: "dom",
			selector: "rapi-doc",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
