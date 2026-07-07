import type { TechnologyDefinition } from '../../types';

export const boidcmsTechnologyDefinition = {
	id: "boidcms",
	name: "BoidCMS",
	website: "https://boidcms.github.io",
	description: "BoidCMS is a free and open-source flat file CMS for building simple websites and blogs in seconds, developed using PHP and uses JSON as a database.",
	icon: "BoidCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boidcms:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("BoidCMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "boidcms:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("boidcms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
