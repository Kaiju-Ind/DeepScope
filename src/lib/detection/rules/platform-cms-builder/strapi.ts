import type { TechnologyDefinition } from '../../types';

export const strapiTechnologyDefinition = {
	id: "strapi",
	name: "Strapi",
	website: "https://strapi.io",
	description: "Strapi is an open-source headless CMS used for building fast and easily manageable APIs written in JavaScript.",
	icon: "Strapi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "strapi:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Strapi", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "strapi:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("(?:\\/\\/|-)strapi-|strapi_jwt"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "strapi:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^strapi", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:strapi:strapi:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
