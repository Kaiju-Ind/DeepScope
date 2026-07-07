import type { TechnologyDefinition } from '../../types';

export const selifyTechnologyDefinition = {
	id: "selify",
	name: "Selify",
	website: "https://selify.io",
	description: "Selify is an ecommerce platform for launching and managing online stores with integrated checkout and storefront tooling.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "selify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("r2\\.selify\\.io\\/shops\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "selify:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.selify\\.io\\/v1"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "selify:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Selify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "selify:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Selify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
