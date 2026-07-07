import type { TechnologyDefinition } from '../../types';

export const commerceJsTechnologyDefinition = {
	id: "commerce-js",
	name: "Commerce.js",
	website: "https://www.commercejs.com",
	description: "Commerce.js is an API-first ecommerce platform for developers and businesses.",
	icon: "commercejs.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commerce-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chec\\.io\\/v(\\d+)\\/commerce\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "commerce-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("chec\\/commerce\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "commerce-js:url:2",
			kind: "url",
			pattern: new RegExp("\\.spaces.chec\\.io"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "commerce-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "CommercejsSpace",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "commerce-js:header:4",
			kind: "header",
			key: "Chec-Version",
			valuePattern: new RegExp(".*", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "commerce-js:header:5",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Commerce.js", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "commerce-js:header:6",
			kind: "header",
			key: "chec-version",
			valuePattern: new RegExp(".*", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "commerce-js:header:7",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("commerce.js", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
